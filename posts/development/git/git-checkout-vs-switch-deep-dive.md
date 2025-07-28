---
title: "Git Checkout vs Switch: 왜 새로운 명령어가 필요했나?"
description: "Git 2.23에서 도입된 switch와 restore 명령어의 탄생 배경과 checkout과의 차이점, 그리고 IntelliJ는 왜 아직도 checkout을 고수하는지에 대한 심층 분석"
published: 2025-07-28T00:00:00Z
lastModified: 2025-07-28T02:52:14Z
authors:
  - XIYO
---

# Git Checkout vs Switch: 왜 새로운 명령어가 필요했나?

Git을 사용하는 개발자라면 누구나 `git checkout` 명령어에 익숙할 것입니다. 하지만 2019년 8월, Git 2.23 버전에서 `git switch`와 `git restore`라는 새로운 명령어가 도입되었습니다. 왜 Git 팀은 잘 작동하던 checkout을 두고 새로운 명령어를 만들었을까요? 그리고 IntelliJ IDEA 같은 주요 IDE는 왜 여전히 checkout을 고수하고 있을까요?

## Checkout의 원죄: 너무 많은 책임

### 하나의 명령어, 너무 많은 기능

`git checkout`은 Git의 초기부터 존재한 명령어입니다. 문제는 이 명령어가 너무 많은 일을 한다는 점입니다.

```bash
# 1. 브랜치 전환
git checkout main

# 2. 새 브랜치 생성하면서 전환
git checkout -b feature/new-feature

# 3. 파일을 이전 상태로 복원
git checkout -- README.md

# 4. 특정 커밋으로 이동 (위험: detached HEAD)
git checkout abc123def

# 5. 원격 브랜치 추적
git checkout --track origin/feature-branch
```

하나의 명령어가 브랜치 전환과 파일 복원이라는 전혀 다른 두 가지 작업을 담당하고 있습니다. 이는 마치 스위스 아미 나이프처럼 보일 수 있지만, 실제로는 사용자에게 혼란을 야기합니다.

### 실수하기 쉬운 인터페이스

특히 초보자들이 자주 겪는 문제들이 있습니다.

**시나리오 1: 의도치 않은 파일 복원**
```bash
# 브랜치 이름을 잘못 입력했는데...
git checkout maim  # 'main'을 치려다 오타

# Git이 'maim'이라는 파일을 복원하려고 시도할 수 있음
# 만약 maim이라는 파일이 있다면 예상치 못한 결과 발생
```

**시나리오 2: Detached HEAD 지옥**
```bash
# 커밋 해시로 이동
git checkout abc123

# 이제 detached HEAD 상태
# 여기서 작업하고 커밋하면... 브랜치를 만들지 않으면 작업이 사라질 위험
```

## Switch의 탄생: 명확한 역할 분리

### Git 2.23의 혁명

2019년 8월, Git 개발팀은 중요한 결정을 내렸습니다. `git checkout`의 기능을 두 개의 명령어로 분리하기로 한 것입니다.

- **`git switch`**: 브랜치 전환 전용
- **`git restore`**: 파일 복원 전용

이는 UNIX 철학인 "Do One Thing Well"(한 가지 일을 잘 하라)을 따른 결정이었습니다.

### Switch vs Checkout: 무엇이 다른가?

#### 브랜치 전환

```bash
# 기존 방식
git checkout main
git checkout -b feature/login

# 새로운 방식
git switch main
git switch -c feature/login  # create의 약자
```

#### Detached HEAD 방지

```bash
# 기존: 실수로 detached HEAD 상태가 되기 쉬움
git checkout abc123def

# 새로운: 명시적으로 의도를 표현해야 함
git switch --detach abc123def
# 명확한 경고와 함께 detached HEAD 상태로 전환
```

#### 더 직관적인 옵션

```bash
# 원격 브랜치 가져오기
# 기존
git checkout --track origin/feature

# 새로운
git switch feature  # 자동으로 origin/feature 추적
```

### Restore: 파일 복원의 새로운 방법

`git restore`는 파일 관련 작업을 전담합니다.

```bash
# 작업 디렉토리의 파일 복원
git restore README.md

# 스테이징 영역에서 제거 (unstage)
git restore --staged README.md

# 특정 커밋의 파일 상태로 복원
git restore --source=HEAD~2 README.md

# 전체 디렉토리 복원
git restore .
```

## 기능 비교표: 한눈에 보기

| 작업            | git checkout              | git switch               | git restore               |
| ------------- | ------------------------- | ------------------------ | ------------------------- |
| 브랜치 전환        | ✅ `checkout main`         | ✅ `switch main`          | ❌                         |
| 새 브랜치 생성      | ✅ `checkout -b new`       | ✅ `switch -c new`        | ❌                         |
| 파일 복원         | ✅ `checkout -- file`      | ❌                        | ✅ `restore file`          |
| Detached HEAD | ⚠️ `checkout hash`        | ✅ `switch --detach hash` | ❌                         |
| 스테이지 취소       | ✅ `checkout HEAD -- file` | ❌                        | ✅ `restore --staged file` |

> [!note] 
> - ✅ 해당 기능 지원
> - ❌ 해당 기능 미지원  
> - ⚠️ 지원하지만 주의 필요 (예: 의도치 않은 detached HEAD 상태)

## 현실: 왜 아직도 Checkout을 쓰나요?

### IntelliJ IDEA의 선택

IntelliJ IDEA는 여전히 checkout을 사용합니다. JetBrains의 공식 입장을 요약하면:

> "우리는 이 명령어를 도입할 특별한 필요성을 보지 못합니다. checkout은 여전히 완벽하게 작동하며, 모든 Git 버전과 호환됩니다."

#### 주요 이유들

- **후방 호환성**: 구버전 Git을 사용하는 환경 지원
- **안정성**: 검증된 워크플로우 유지
- **사용자 습관**: 이미 익숙한 인터페이스 보존

### 다른 도구들의 대응

**Visual Studio Code**
- GUI에서는 여전히 "Checkout" 용어 사용
- 터미널에서는 switch/restore 사용 가능

**GitHub Desktop**
- 사용자 친화적인 용어 사용 ("Switch to branch")
- 내부적으로는 적절한 Git 명령어 실행

**SourceTree**
- 전통적인 checkout 인터페이스 유지
- 안정성과 호환성 우선

## 실무에서의 선택: 무엇을 써야 할까?

### 새 프로젝트라면

```bash
# 브랜치 작업은 switch로
git switch main
git switch -c feature/awesome

# 파일 작업은 restore로
git restore src/app.js
git restore --staged .
```

### 기존 프로젝트라면

- 팀의 Git 버전 확인 (2.23 이상인지)
- 기존 스크립트와 CI/CD 파이프라인 검토
- 점진적 마이그레이션 고려

### 권장 사항

**✅ 추천하는 경우**
- 새로운 개발자 교육 시
- 새 프로젝트 시작 시
- Git 2.23 이상 환경

**⚠️ 신중해야 할 경우**
- 레거시 시스템 작업
- 다양한 Git 버전 환경
- 기존 자동화 스크립트 많은 경우

## Git의 미래: Checkout은 사라질까?

### 공식 입장

Git 개발팀의 입장은 명확합니다.

> "checkout은 deprecated되지 않았으며, 가까운 미래에 제거될 계획이 없습니다."

### 현실적인 전망

- **공존의 시대**: checkout, switch, restore 모두 계속 지원
- **점진적 전환**: 새로운 사용자는 switch/restore 학습
- **도구의 진화**: IDE와 GUI 도구들의 점진적 적응

## 마무리: 더 나은 Git을 향해

`git switch`와 `git restore`의 도입은 Git을 더 사용하기 쉽게 만들려는 노력의 일환입니다. 하나의 복잡한 명령어를 명확한 목적을 가진 두 개의 명령어로 분리함으로써, Git은 더 직관적이고 실수하기 어려운 도구로 진화하고 있습니다.

당장 모든 것을 바꿀 필요는 없습니다. 하지만 새로운 명령어들이 제공하는 명확성과 안전성을 이해하고, 상황에 맞게 선택하여 사용한다면 더 나은 Git 경험을 할 수 있을 것입니다.

**기억하세요**: 도구는 우리를 돕기 위해 존재합니다. checkout이든 switch든, 여러분과 팀에게 가장 잘 맞는 방식을 선택하면 됩니다. 중요한 것은 그 선택이 정보에 기반한 의식적인 결정이어야 한다는 점입니다.
