# Git Hooks를 활용한 마크다운 프론트매터 자동화 여정

## 기: 문제의 시작 - Pre-commit Hook의 한계

마크다운 블로그를 운영하면서 각 포스트의 프론트매터를 수동으로 관리하는 것이 번거로웠습니다. 특히 커밋 메시지, 작성자, 날짜 등의 메타데이터를 매번 직접 입력해야 하는 상황이었죠.

처음에는 **pre-commit hook**을 사용해 해결하려 했습니다.

```bash
# .husky/pre-commit (초기 버전)
# 스테이징된 마크다운 파일들의 프론트매터 업데이트
```

### Pre-commit 방식의 문제점

하지만 곧 심각한 문제를 발견했습니다:

1. **스테이징 변경사항 잔존**: 프론트매터를 업데이트하면 항상 Git 스테이지에 새로운 변경사항이 남아있음
2. **추가 커밋 필요**: 업데이트된 프론트매터를 반영하기 위해 또 다른 커밋이 필요
3. **커밋 메시지 접근 불가**: 가장 치명적으로, pre-commit 단계에서는 아직 커밋 메시지가 확정되지 않아 프론트매터에 포함할 수 없음

```javascript
// pre-commit에서는 이것이 불가능
const commitMessage = "???"; // 아직 존재하지 않음
```

## 승: Post-commit Hook으로의 전환

Pre-commit의 한계를 깨닫고 **post-commit hook**으로 방향을 전환했습니다.

```bash
# .husky/post-commit
# 커밋 완료 후 프론트매터 업데이트 + git commit --amend
```

### Post-commit + Amend 방식

이 방식은 다음과 같이 동작했습니다:

1. 사용자가 커밋: `"✨ 새 기능 추가"`
2. Post-commit hook 실행
3. 커밋 히스토리에서 메시지 추출 후 프론트매터 업데이트
4. `git commit --amend --no-edit --no-verify`로 기존 커밋에 변경사항 포함

```javascript
// scripts/update-frontmatter-postcommit.js
const changedFiles = execSync('git diff --name-only HEAD HEAD~1')
  .trim().split('\n').filter(file => file.endsWith('.md'));

// ... 프론트매터 업데이트 ...

// 기존 커밋에 변경사항 추가
execSync('git commit --amend --no-edit --no-verify');
```

### 새로운 복잡성의 등장

Post-commit 방식은 커밋 메시지 접근 문제를 해결했지만, 새로운 문제들이 생겼습니다:

1. **무한루프 위험**: `git commit --amend`가 또 다른 post-commit hook을 트리거
2. **복잡한 방지 로직 필요**:
   ```bash
   # 무한루프 방지 코드
   if [ "$FRONTMATTER_UPDATE_RUNNING" = "1" ]; then
     exit 0
   fi
   export FRONTMATTER_UPDATE_RUNNING=1
   ```
3. **Git 히스토리 변조**: SHA 변경으로 인한 협업 시 충돌 가능성
4. **--no-verify의 한계**: Post-commit hook은 `--no-verify`로 건너뛸 수 없음을 발견

## 전: 근본적인 해결책 탐색

복잡해진 코드를 보며 더 나은 방법이 있을 것이라 생각했습니다. Git hooks에 대해 더 깊이 조사한 결과, **prepare-commit-msg hook**이라는 완벽한 해결책을 발견했습니다.

### prepare-commit-msg Hook의 발견

웹 검색을 통해 Git commit workflow의 정확한 순서를 확인했습니다:

1. 파일 스테이징 (`git add`)
2. **pre-commit** hook 실행
3. **prepare-commit-msg** hook 실행 ← **여기가 핵심!**
4. **commit-msg** hook 실행
5. 실제 커밋 생성
6. **post-commit** hook 실행

### Prepare-commit-msg의 완벽한 타이밍

이 hook의 특징을 발견했습니다:

- ✅ 커밋 메시지가 이미 확정된 상태
- ✅ 아직 커밋이 생성되기 전
- ✅ 파일 수정 후 re-staging 가능
- ✅ 같은 커밋에 자동으로 포함됨

```bash
# prepare-commit-msg hook 파라미터
# $1 = 커밋 메시지 파일 경로
# $2 = 커밋 소스 (message, template, merge 등)

CURRENT_MSG=$(cat "$1")  # 커밋 메시지 읽기 가능!
```

## 결: 완벽한 해결책 구현

### 최종 구현

prepare-commit-msg 방식으로 완전히 재구현했습니다:

```bash
# .husky/prepare-commit-msg
#!/bin/sh

COMMIT_MSG_FILE="$1"
COMMIT_SOURCE="$2"

# 일반 커밋에서만 실행
if [ "$COMMIT_SOURCE" = "message" ] || [ -z "$COMMIT_SOURCE" ]; then
  CURRENT_MSG=$(cat "$COMMIT_MSG_FILE")
  
  # 스테이징된 마크다운 파일 찾기
  STAGED_MD_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.md$')
  
  if [ -n "$STAGED_MD_FILES" ]; then
    export COMMIT_MESSAGE="$CURRENT_MSG"
    
    if pnpm exec node scripts/update-frontmatter-prepare.js; then
      echo "✅ Frontmatter updated and re-staged successfully"
    fi
  fi
fi
```

```javascript
// scripts/update-frontmatter-prepare.js
const commitMessage = process.env.COMMIT_MESSAGE;
const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM')
  .trim().split('\n').filter(file => file && file.endsWith('.md'));

// 프론트매터 업데이트
const updatedData = {
  title: title,
  description: description,
  authors: uniqueAuthors,
  dates: dates,
  messages: [commitMessage, ...existingMessages], // 현재 커밋 메시지 포함!
  created: createdDate,
  modified: modifiedDate
};

// 파일 업데이트 후 자동 re-staging
writeFileSync(filePath, updatedContent);
execSync(`git add "${file}"`); // 자동으로 같은 커밋에 포함됨
```

### 혁신적인 결과

최종 구현의 장점:

1. **완벽한 타이밍**: 커밋 메시지 확정 후, 커밋 생성 전
2. **자동 포함**: re-staging된 변경사항이 자연스럽게 같은 커밋에 포함
3. **복잡성 제거**: 무한루프 방지 로직 불필요
4. **히스토리 무결성**: SHA 변경 없음, amend 불필요
5. **협업 안전**: Git의 정당한 워크플로우 활용

### 실제 동작 예시

```bash
$ git commit -m "✨ 새로운 기능 추가"

🔍 Running pre-commit checks...
✅ All pre-commit checks passed!

📝 Running prepare-commit-msg hook...
📄 Found staged markdown files: new-feature.md
✅ new-feature.md 프론트매터 업데이트 완료
✅ 업데이트된 프론트매터가 스테이징되었습니다.

📝 Validating commit message...
✅ Commit message validation passed

[main abc1234] ✨ 새로운 기능 추가
 2 files changed, 50 insertions(+)
```

결과적으로 생성된 마크다운:

```yaml
---
title: 새로운 기능
description: 이번에 추가한 혁신적인 기능입니다
authors:
  - XIYO
dates:
  - '2025-07-20T09:40:48.024Z'
messages:
  - '✨ 새로운 기능 추가'  # 자동으로 포함됨!
created: '2025-07-20T09:40:48.024Z'
modified: '2025-07-20T09:40:48.024Z'
---

# 새로운 기능

이번에 추가한 혁신적인 기능입니다...
```

## 결론: 올바른 도구를 찾는 여정

이 프로젝트를 통해 배운 교훈:

1. **문제의 근본 이해**: 단순히 동작하는 해결책이 아닌, 왜 그 문제가 발생하는지 이해하기
2. **도구의 깊이 있는 탐색**: Git hooks의 다양한 종류와 각각의 특성 파악
3. **복잡성은 신호**: 코드가 복잡해진다면 더 나은 방법이 있을 가능성
4. **정당한 방법의 힘**: Git의 설계 의도에 맞는 워크플로우 활용

Pre-commit → Post-commit → Prepare-commit-msg로 이어진 이 여정은 단순한 기술적 해결책을 넘어, 문제 해결의 본질에 대해 생각해보게 하는 귀중한 경험이었습니다.

---

*이 포스트의 프론트매터 역시 prepare-commit-msg hook에 의해 자동으로 생성되었습니다! 🎉*