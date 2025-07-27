---
title: 개발자 필수 도구 설치
authors:
  - XIYO
tags:
  - mac-setup
  - developer-tools
  - git
  - docker
  - vscode
  - iterm2
  - jetbrains
lastModified: 2025-07-27T21:20:48Z
published: 2025-07-22T00:14:46Z
---

# 개발자 필수 도구 설치

> [!NOTE]
> **사전 요구사항**
> 이 가이드를 진행하기 전에 [Homebrew 설치](macos-step00-homebrew-installation)가 완료되어야 합니다.

## 필수 도구 설치

### 개발 도구

Git - 분산 버전 관리 시스템

```bash
brew install git
```

GitHub CLI - 터미널에서 GitHub 사용

```bash
brew install gh
```

### 터미널 & 에디터

iTerm2 - 강력한 터미널 에뮤레이터

```bash
brew install --cask iterm2
```

Visual Studio Code - 마이크로소프트의 무료 코드 에디터

```bash
brew install --cask visual-studio-code
```

### 개발 환경

Docker Desktop - 컨테이너 기반 가상화 플랫폼

```bash
brew install --cask docker-desktop
```

JetBrains Toolbox - JetBrains IDE 관리 도구

```bash
brew install --cask jetbrains-toolbox
```

### 폰트

D2Coding Nerd Font - 한글 지원 코딩 전용 폰트

```bash
brew install --cask font-d2coding-nerd-font
```

Pretendard - 가독성이 뛰어난 한글 폰트

```bash
brew install --cask font-pretendard
```

> [!INFO]
> **Homebrew 패키지명 변경 사항**
>
> - **Docker**: `docker` → `docker-desktop`
> - **폰트 저장소**: 별도 tap 불필요 (메인 저장소에 통합)


## 추가 설정

- **Git & GitHub CLI** → [Git & GitHub 설정 가이드](git-github-setup)
- **JetBrains Toolbox** → [JetBrains 설정 가이드](jetbrains-setup)
- **iTerm2 + Oh My Zsh** → [터미널 꾸미기 가이드](terminal-customization)

## 다음 단계

필수 도구 설치가 완료되었습니다.

[다음 단계: 시스템 유틸리티 설치](macos-step02-system-utilities)
