---
title: "Mac 초기 설정 가이드"
description: "Apple Silicon Mac에 Homebrew 패키지 관리자 설치 - 개발 환경 구성의 필수 첫 단계"
authors:
  - XIYO
dates:
  - Thu Jul 17 2025 09:00:00 GMT+0900 (대한민국 표준시)
tags:
  - mac-setup
  - homebrew
  - apple-silicon
  - getting-started
---

# Mac 초기 설정 가이드

이 가이드는 Apple Silicon Mac을 위한 개발 환경 설정 문서입니다. Intel Mac을 위한 설정 방법은 다루지 않습니다.

> [!INFO]
> **Mac 프로세서 확인 방법**
> 
> 1. 화면 왼쪽 상단의 Apple 로고 클릭
> 2. "이 Mac에 관하여" 선택
> 3. 프로세서 정보 확인:
>    - **Apple Silicon**: "칩" 항목에 Apple M1, M2, M3, M4 등으로 표시
>    - **Intel**: "프로세서" 항목에 Intel Core i5, i7 등으로 표시

> [!WARNING]
> **Intel Mac 사용자 주의**
> 
> Intel 프로세서 Mac에서 이 가이드를 따르면 정상적으로 작동하지 않습니다.
> Apple Silicon (M1, M2, M3, M4)이 확인된 경우에만 진행하세요.

## Homebrew란?

Homebrew는 macOS용 패키지 관리자입니다. App Store와 달리 커뮤니티가 운영하는 오픈소스 저장소로, 개발자들이 필요로 하는 도구와 라이브러리를 명령줄에서 자유롭게 설치하고 관리할 수 있게 해줍니다.

### Homebrew가 필요한 이유

개발 도구들은 대부분 App Store에서 제공되지 않습니다. Git, Node.js, Python, Docker 같은 필수 도구들을 각각의 웹사이트에서 다운로드하고 복잡한 설치 과정을 거쳐야 합니다. Homebrew를 사용하면 이 모든 과정을 단순한 명령어로 해결할 수 있습니다.

### 주요 기능

- **패키지 설치**: 명령어 하나로 프로그램 설치
- **의존성 관리**: 필요한 라이브러리를 자동으로 함께 설치
- **버전 관리**: 설치된 패키지를 최신 버전으로 유지

## 시작하기 전에

> [!NOTE]
> **터미널 열기**
> 1. `Cmd + Space`를 눌러 Spotlight 검색을 엽니다
> 2. "터미널" 또는 "Terminal"을 입력합니다
> 3. 터미널 앱을 클릭해서 실행합니다

## Homebrew 설치하기

### 설치 확인

Homebrew가 이미 설치되어 있는지 확인

```bash
if command -v brew &> /dev/null; then
    echo "Homebrew가 이미 설치되어 있습니다."
    brew --version
else
    echo "Homebrew가 설치되어 있지 않습니다."
fi
```

### Homebrew 설치

Homebrew 설치 스크립트 실행

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> [!NOTE]
> 설치 과정에서 Mac 로그인 비밀번호를 요구합니다.
> 비밀번호 입력 시 화면에 표시되지 않는 것이 정상입니다.

### 환경 설정

Homebrew 경로를 터미널 설정 파일에 추가

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
```

현재 터미널 세션에 즉시 적용

```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
```


### 설치 확인

설치가 완료되었는지 확인

```bash
brew --version
```

> [!TIP]
> 버전 정보가 표시되면 설치가 성공적으로 완료된 것입니다.

> [!WARNING]
> **문제 해결**
> - 터미널을 완전히 종료하고 다시 실행
> - Mac 재시작
> - [Homebrew 공식 문서](https://docs.brew.sh/Installation) 참고

## 다음 단계

Homebrew 설치가 완료되었습니다.

[다음 단계: 개발 도구 설치](macos-step01-essential-developer-tools)
