---
title: "옵시디언 설치 가이드: 패키지 매니저로 간단하게 시작하기"
description: Windows와 macOS에서 패키지 매니저를 사용하여 옵시디언을 설치하는 방법을 설명합니다. 한국어 사용자를 위한 추가 설정도 포함합니다.
authors: [XIYO]
tags:
  - obsidian
  - installation
  - winget
  - homebrew
  - setup
published: 2025-07-27
---

# 옵시디언 설치 가이드: 패키지 매니저로 간단하게 시작하기

옵시디언은 마크다운 기반의 노트 작성 도구입니다. 이 글에서는 Windows와 macOS에서 패키지 매니저를 사용하여 옵시디언을 설치하는 방법을 설명합니다.

## Windows에서 winget으로 설치하기

```powershell
# 옵시디언 검색
winget search obsidian

# 옵시디언 설치
winget install Obsidian.Obsidian
```

설치가 완료되면 시작 메뉴에서 Obsidian을 찾을 수 있습니다.

### 설치 확인 및 실행

```powershell
# 설치된 프로그램 확인
winget list obsidian

# PowerShell에서 직접 실행
Start-Process obsidian
```

## macOS에서 Homebrew로 설치하기

```bash
# 옵시디언 검색
brew search obsidian

# 옵시디언 설치
brew install --cask obsidian
```

### 설치 확인 및 실행

```bash
# 설치된 애플리케이션 확인
brew list --cask | grep obsidian

# 터미널에서 실행
open -a Obsidian
```

## 한국어 사용자를 위한 추가 설정

### 언어 설정 변경

1. 옵시디언을 실행한 후 설정(Settings) 열기: `Ctrl/Cmd + ,`
2. **Options → General → Language**에서 "한국어"를 선택
3. 옵시디언을 재시작하면 한국어 인터페이스가 적용됩니다

## 첫 번째 보관함(Vault) 만들기

### 보관함 생성

1. 옵시디언 실행 후 "새 보관함 만들기" 선택
2. 보관함 이름 입력 (예: "내 노트")
3. 저장 위치 선택
   - Windows: `C:\Users\사용자명\Documents\Obsidian\내 노트`
   - macOS: `~/Documents/Obsidian/내 노트`

### 권장 폴더 구조

```
내 노트/
├── 일일노트/
├── 프로젝트/
├── 참고자료/
├── 템플릿/
└── 첨부파일/
```

## 패키지 매니저를 통한 업데이트

### Windows에서 업데이트

```powershell
# 업데이트 가능 여부 확인
winget upgrade obsidian

# 옵시디언 업데이트
winget upgrade Obsidian.Obsidian
```

### macOS에서 업데이트

```bash
# Homebrew 패키지 목록 업데이트
brew update

# 옵시디언 업데이트
brew upgrade --cask obsidian
```

## 일반적인 문제 해결

### Windows에서 실행 시 보안 경고

Windows Defender SmartScreen이 경고를 표시하는 경우:
1. "추가 정보" 클릭
2. "실행" 버튼 클릭

### macOS에서 "개발자를 확인할 수 없음" 오류

```bash
# 터미널에서 다음 명령어 실행
xattr -cr /Applications/Obsidian.app
```

또는 시스템 환경설정 → 보안 및 개인 정보 보호에서 "확인 없이 열기" 클릭

## 다음 단계

옵시디언 설치가 완료되었다면 다음 단계를 진행해보세요:

1. 기본 마크다운 문법 익히기
2. 핵심 기능인 링크(`[[]]`) 사용법 학습
3. 일일 노트 플러그인 활성화
4. 동기화 방법 설정 (iCloud, Git, Syncthing 등)

패키지 매니저를 사용하면 설치와 업데이트 관리가 간편해집니다. 터미널 명령어 한 줄로 항상 최신 버전을 유지할 수 있다는 것이 큰 장점입니다.