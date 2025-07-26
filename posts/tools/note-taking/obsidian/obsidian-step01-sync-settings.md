---
title: Obsidian 동기화 설정
dates:
  - "2025-07-22T16:09:12.000Z"
  - "2025-07-22T15:45:32.000Z"
  - "2025-07-21T19:25:39.000Z"
  - "2025-07-21T15:45:51.000Z"
  - "2025-07-21T15:14:46.000Z"
authors:
  - XIYO
tags: obsidian, sync, git, cloud, backup
---

# 옵시디언 1단계 동기화 설정

> [!NOTE]
> **여러 기기에서 노트 동기화하기**
> 데스크톱, 노트북, 모바일, 태블릿에서 동일한 노트를 사용하는 방법입니다.

## 동기화 옵션 비교

| 방법 | 가격 | 데스크톱 | 모바일 | 실시간 | 버전관리 |
|------|------|----------|--------|--------|----------|
| Obsidian Sync | $4/월 | O | O | O | O |
| Git (Obsidian Git) | 무료 | O | X | 자동 | O |
| iCloud | 무료 | O | O | O | X |
| **Git + iCloud** | 무료 | O | O | O | O |

## Git 동기화 (개발자 추천)

> [!IMPORTANT]
> **사전 준비 필요**
> Git과 GitHub 설정이 필요합니다. [Git & GitHub 설정 가이드](../mac-setup/git-github-setup)를 먼저 완료하세요.

### Obsidian Git 플러그인 설치

1. Settings → Community plugins → Browse
2. "Obsidian Git" 검색 및 설치
3. 플러그인 활성화

### Git 저장소 초기화

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:
```bash
cd ~/Documents/Obsidian/YourVault
git init
echo ".obsidian/workspace*" >> .gitignore
git add .
git commit -m "Initial commit"
```

### GitHub 저장소 연결

> [!TIP]
> **gh로 이미 로그인했다면**
> GitHub CLI로 로그인이 되어있으면 자동으로 인증이 처리됩니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:
```bash
gh repo create obsidian-vault --private --source=. --remote=origin --push
```

### Obsidian Git 플러그인 설정

Settings → Obsidian Git에서:

#### 기본 설정
- **Vault backup interval**: 10 (10분마다 자동 백업)
- **Auto pull interval**: 10 (10분마다 자동 pull)
- **Commit message**: `vault backup: {{date}}`
- **Pull updates on startup**: ON (시작 시 최신 버전 받기)
- **Push on backup**: ON (백업 시 자동 push)

#### 고급 설정
- **Sync method**: Merge (충돌 시 병합)
- **Pull method**: Merge (pull 시 병합 방식)
- **Disable push**: OFF (push 활성화)
- **Disable notifications**: OFF (알림 표시)
- **Show status bar**: ON (상태바에 Git 상태 표시)

#### 자동 백업 트리거
- **Backup on file save**: ON (파일 저장 시 백업)
- **Backup after file change**: ON (파일 변경 후 백업)
- **Auto backup after latest commit**: 5 (마지막 커밋 5분 후 자동 백업)

> [!IMPORTANT]
> **앱 종료 시 자동 백업**
> Obsidian을 종료하거나 슬립 모드 전환 시 자동으로 백업하려면:
> 1. **커맨드 팔레트** (Cmd+P) → "Obsidian Git: Create backup"를 단축키에 등록
> 2. **macOS Shortcuts 앱**에서 자동화 생성:
>    - 트리거: "앱이 종료될 때" 또는 "슬립 모드 전환 시"
>    - 동작: Obsidian Git backup 실행
>
> 또는 더 간단하게:
> - **Auto backup after latest commit**: 1~2분으로 설정
> - 이렇게 하면 마지막 변경 후 1-2분 내에 항상 백업됩니다.

#### 파일 관리
- **List of files to not commit**:
  ```
  .obsidian/workspace*
  .obsidian/app.json
  .obsidian/appearance.json
  .trash/
  .DS_Store
  ```
- **Pull changes before push**: ON (push 전 pull 실행)

#### 성능 최적화
- **Improved performance for large vaults**: ON (큰 Vault 최적화)
- **Show changes files count**: ON (변경 파일 수 표시)

> [!TIP]
> **커밋 메시지 변수**
> - `{{date}}`: 현재 날짜/시간
> - `{{hostname}}`: 컴퓨터 이름
> - `{{numFiles}}`: 변경된 파일 수
>
> 예: `vault backup: {{date}} on {{hostname}} ({{numFiles}} files)`

> [!INFO]
> **설정 완료**
>
> 이제 자동으로 Git에 백업됩니다.
> 별도의 인증 설정 없이 gh 크레덴셜을 사용합니다.

## iCloud 동기화 (Apple 사용자)

> [!IMPORTANT]
> **iPhone에서 먼저 볼트 생성 필요**
> iCloud Drive에 Obsidian 디렉토리를 만들려면 반드시 iPhone의 Obsidian 앱에서 먼저 볼트를 생성해야 합니다. Mac에서는 직접 생성할 수 없습니다.

### iPhone에서 볼트 생성
1. **iPhone에서 Obsidian 앱 설치**
2. **앱 실행 후 "Create new vault" 선택**
3. **"Store in iCloud" 옵션 선택**
4. **볼트 이름 지정** (예: MyVault)
5. **자동으로 iCloud Drive에 Obsidian 폴더 생성됨**

### Mac에서 연결
1. **Finder 열기** → **iCloud Drive**
2. **Obsidian 폴더** 찾기
3. **Mac Obsidian에서 "Open folder as vault" 선택**
4. **iCloud Drive → Obsidian → MyVault 선택**

### 장점
- 설정이 매우 간단
- 실시간 동기화
- 모든 Apple 기기 지원

### 단점
- Apple 기기만 가능
- 버전 관리 없음
- iPhone에서 먼저 설정 필요

## Obsidian Sync (공식 솔루션)

### 장점
- 모든 플랫폼 지원
- 엔드투엔드 암호화
- 버전 히스토리

### 가격
- **$4/월** (연간 결제)
- 학생 40% 할인: [신청하기](https://obsidian.md/student-discount)

### 설정
1. Settings → Sync → Log in
2. 구독 후 자동 동기화

## 하이브리드: Git + iCloud (최적 솔루션)

> [!TIP]
> **두 방법의 장점을 모두 활용**
> 데스크톱에서는 Git으로 버전 관리, 모바일에서는 iCloud로 접근

### 설정 방법

> [!WARNING]
> **순서가 중요합니다!**
> 반드시 iPhone의 Obsidian 앱에서 먼저 볼트를 생성해야 iCloud Drive에 Obsidian 디렉토리가 만들어집니다.

1. **iPhone에서 볼트를 생성했는지 확인**
   - iPhone Obsidian 앱에서 "Store in iCloud"로 볼트 생성
   - 이 과정이 iCloud Drive에 Obsidian 폴더를 자동 생성

2. **Mac에서 해당 볼트 열기**
   ```
   ~/Library/Mobile Documents/com~apple~CloudDocs/Obsidian/MyVault
   ```

3. **Git 초기화 (위의 Git 동기화 방법 참조)**

4. **작업 흐름**
   - 데스크톱: Git으로 커밋/푸시 (버전 관리)
   - 모바일: iCloud로 읽기/쓰기 (실시간 동기화)
   - Obsidian Git 플러그인이 자동으로 동기화

### 장점
- 모든 기기에서 사용 가능
- 버전 관리 + 실시간 동기화
- 완전 무료

## 권장 사항

- **개발자**: Git + iCloud 하이브리드
- **일반 사용자**: iCloud (Mac) 또는 Obsidian Sync
- **크로스 플랫폼**: Obsidian Sync

> [!WARNING]
> Git + iCloud 하이브리드는 한 번에 한 기기에서만 편집하세요. 동시 편집 시 충돌 가능성이 있습니다.

## 다음 단계

동기화 설정이 완료되었다면:
<!-- 
- [필수 플러그인 설치](step-02)
- [고급 설정](step-03)
-->

