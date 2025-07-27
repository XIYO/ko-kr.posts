---
title: JetBrains 설정 가이드
dates:
  - "2025-07-22T15:45:32.000Z"
  - "2025-07-21T19:25:39.000Z"
  - "2025-07-21T15:45:51.000Z"
  - "2025-07-21T15:14:46.000Z"
authors:
  - XIYO
tags:
  - mac-setup
  - jetbrains
  - intellij
  - ide
  - development-tools
  - font-settings
lastModified: 2025-07-26T11:55:18+09:00
---

# JetBrains 설정 가이드

## JetBrains란?

JetBrains는 체코의 소프트웨어 개발 회사로, 개발자 생산성을 극대화하는 IDE(통합 개발 환경)를 만드는 것으로 유명합니다.
IntelliJ IDEA(Java), PyCharm(Python), WebStorm(JavaScript), GoLand(Go) 등 언어별 특화된 IDE를 제공합니다.

전 세계 개발자들이 가장 선호하는 IDE 중 하나로, 스마트한 코드 완성, 강력한 디버깅, 리팩토링 도구를 제공합니다.

## JetBrains Toolbox란?

JetBrains Toolbox는 JetBrains의 모든 IDE를 한 곳에서 관리할 수 있는 데스크톱 앱입니다.
마치 App Store처럼 IDE를 설치, 업데이트, 제거할 수 있고 여러 버전을 동시에 관리할 수 있습니다.

### Toolbox로 설치해야 하는 이유

**독립적으로 설치할 때의 문제점:**

- 각 IDE를 개별적으로 다운로드하고 설치해야 함
- 업데이트를 수동으로 확인하고 설치해야 함
- 라이선스를 각각 관리해야 함
- 여러 버전 관리가 복잡함

**Toolbox 사용의 장점:**

- 모든 IDE를 한 곳에서 통합 관리
- 자동 업데이트 지원
- 하나의 라이선스로 모든 IDE 사용
- 프로젝트별로 다른 IDE 버전 사용 가능
- 터미널에서 IDE 실행을 위한 shell script 자동 생성

## JetBrains Toolbox 초기 설정

### Toolbox 실행

JetBrains Toolbox 앱을 실행하는 명령어입니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
open -a "JetBrains Toolbox"
```

> [!INFO]
> **macOS 보안 승인 필요**
>
> 최초 실행 시 "JetBrains Toolbox를 열어도 괜찮겠습니까?" 같은 보안 대화상자가 나타납니다.
> "열기"를 클릭해서 승인해주세요.

### 로그인

JetBrains 계정으로 로그인합니다. 계정이 없다면 [JetBrains 계정 생성](https://account.jetbrains.com/login)에서 먼저 계정을 만드세요.

## IntelliJ IDEA Ultimate 설치

IntelliJ IDEA는 JetBrains의 대표적인 Java IDE입니다. Community(무료)와 Ultimate(유료) 두 가지 버전이 있습니다:

- **Community Edition**: 기본적인 Java 개발 기능 제공 (무료)
- **Ultimate Edition**: 웹 개발, 데이터베이스, 프레임워크 지원 등 고급 기능 포함 (유료, 학생 무료)

**IntelliJ IDEA Ultimate에 포함된 주요 기능:**

- **웹 개발**: JavaScript, TypeScript, React, Vue.js, Angular 지원
- **데이터베이스**: DataGrip의 모든 기능 내장 (MySQL, PostgreSQL, MongoDB 등)
- **프레임워크**: Spring, Spring Boot, Hibernate, JPA 지원
- **버전 관리**: Git, SVN, Mercurial 고급 기능
- **클라우드**: Docker, Kubernetes, AWS, Google Cloud 지원
- **테스팅**: JUnit, TestNG, Mockito 통합 지원

Ultimate 하나로 Java 백엔드부터 React 프론트엔드, 데이터베이스 작업까지 모든 개발을 할 수 있습니다.

> 커뮤니티 버전은 무료라고는 하지만 막상 필요한 기능 하나하나가 얼티밋에만 있어서 안 쓰는게 정신건강에 좋다는 소문이... 🤒

### 설치

Toolbox에서 **IntelliJ IDEA Ultimate**을 찾아서 Install을 클릭합니다.

### 라이선스 활성화

IntelliJ IDEA Ultimate을 사용하려면 라이선스가 필요합니다. 세 가지 옵션이 있습니다:

#### 30일 무료 체험

- 별도 신청 없이 바로 30일간 사용 가능
- 체험 기간 동안 모든 기능 사용 가능

#### 학생 무료 라이선스

- 학생 인증 시 졸업까지 무료 사용
- [JetBrains 학생 라이선스 신청](https://www.jetbrains.com/student/)
- 학교 이메일 또는 학생증으로 인증

#### 유료 구독

- **개인**: 월 $17 / 연 $169 (1년차) → $135 (2년차) → $101 (3년차 이후)
- **기업**: 월 $60 / 연 $599 (사용자당)

> [!INFO]
> **연속 구독 할인 혜택**
>
> JetBrains는 연속 구독에 대해 할인을 적용합니다. 학생 인증으로 사용한 기간도
> 나중에 유료 구독 전환 시 사용 기간에 포함되어 할인 혜택을 받을 수 있습니다.
>
> **체험판으로 시작**: 30일 체험 → 학생 라이선스 (무료) → 유료 구독 (할인 적용) 순서를 권장합니다.

## IntelliJ 핵심 단축키

IntelliJ의 생산성을 극대화하는 핵심 단축키들입니다. 이것들만 익혀도 개발 속도가 크게 향상됩니다.

### 검색 관련 (가장 중요!)

- `Double Shift` - 모든 것 검색 (파일, 클래스, 메서드, 설정 등)
- `Cmd + Shift + A` - 모든 액션 검색 (메뉴, 기능 찾기)
- `Cmd + Shift + F` - 전체 프로젝트에서 텍스트 검색
- `Cmd + F` - 현재 파일에서 검색
- `Cmd + R` - 현재 파일에서 바꾸기

### 파일 및 내비게이션

- `Cmd + E` - 최근 열었던 파일 목록
- `Cmd + Shift + E` - 최근 편집한 파일 목록
- `Cmd + O` - 클래스로 이동
- `Cmd + Shift + O` - 파일로 이동
- `Cmd + Alt + O` - 심볼(메서드, 변수)로 이동

### 코드 편집

- `Cmd + D` - 현재 줄 복사
- `Cmd + X` - 현재 줄 잘라내기 (선택 영역 없이)
- `Cmd + /` - 한 줄 주석 토글
- `Cmd + Shift + /` - 블록 주석 토글
- `Alt + Up/Down` - 메서드 단위로 이동
- `Cmd + Shift + Up/Down` - 코드 블록 이동

### 실행 및 디버깅

- `Ctrl + R` - 실행
- `Ctrl + D` - 디버그 실행
- `F8` - 디버그 시 다음 줄로 이동
- `F7` - 디버그 시 메서드 안으로 들어가기
- `Shift + F8` - 디버그 시 메서드에서 나오기

### 리팩토링

- `Shift + F6` - 이름 바꾸기 (변수, 메서드, 클래스)
- `Cmd + Alt + M` - 메서드 추출
- `Cmd + Alt + V` - 변수 추출
- `Cmd + Alt + L` - 코드 포맷팅

> [!TIP]
> **단축키 학습 팁**
>
> 처음에는 `Double Shift`와 `Cmd + Shift + A`만 기억해도 됩니다.
> 이 두 개만으로도 모든 기능에 접근할 수 있고, 사용하면서 자연스럽게 다른 단축키도 익혀집니다.

## D2Coding Nerd Font 설정

> [!INFO]
> **D2Coding Nerd Font 사전 설치 확인**
>
> D2Coding Nerd Font는 한글 지원과 개발자 아이콘을 모두 지원하는 폰트입니다.
> macos-step01-essential-developer-tools.md에서 이미 설치했으므로 설정만 진행하면 됩니다.

### 에디터 폰트 설정

IntelliJ IDEA → Settings (`Cmd+,`) → Editor → Font에서 다음과 같이 설정합니다:

- Font: **D2CodingLigature Nerd Font**
- Size: **14** (권장)
- Line height: **1.2**
- Enable ligatures: ON (코드 가독성 향상)

> [!INFO]
> **Nerd Font**: 개발자를 위해 특별히 제작된 폰트로, 일반 폰트에 Git 상태, 파일 타입, 디렉토리 등을 나타내는
> 수천 개의 아이콘이 추가된 폰트입니다. 터미널 테마나 IDE에서 파일 아이콘, 브랜치 표시 등이 깔끔하게 보입니다.
>
> **Ligatures**: 연속된 문자들을 하나의 기호로 합쳐서 표시하는 기능입니다. 예를 들어 `=>`, `>=`, `!=`, `===` 같은
> 코드가 `⇒`, `≥`, `≠`, `≡` 처럼 더 읽기 쉬운 기호로 표시됩니다. 코드의 의미를 시각적으로 더 명확하게 만들어줍니다.

### 터미널 폰트 설정

Editor → Color Scheme → Console Font에서 다음과 같이 설정합니다:

- "Use console font instead of the default" 체크
- Font: **D2CodingLigature Nerd Font**
- Size: **14**
- Line height: **1.2**

### 터미널 추가 설정

Tools → Terminal에서 다음과 같이 설정합니다:

- Shell path: `/bin/zsh` (macOS 기본값이므로 보통 이미 설정됨)
- Environment variables: `TERM=xterm-256color` 추가

> [!INFO]
> **설정 항목 설명**
>
> **Shell path**: macOS는 기본적으로 zsh를 사용하므로 `/bin/zsh`가 이미 설정되어 있습니다. Oh My Zsh 설치 여부와 관계없이 동일합니다.
>
> **Environment variables - TERM**: 터미널의 색상 지원 수준을 정의합니다. `xterm-256color`로 설정하면 256색상을 지원하여
> 터미널 테마의 색상이 제대로 표시됩니다. 특히 Powerlevel10k 같은 테마에서 중요합니다.

## 터미널에서 프로젝트 열기

### Shell Script 활성화하기

먼저 JetBrains Toolbox에서 shell script를 활성화해야 합니다:

1. **JetBrains Toolbox** 열기
2. 우측 상단 **설정** 아이콘 클릭 (⚙️)
3. **Settings** → **Tools** 탭
4. **Generate shell scripts** 체크
5. **Shell scripts location** 경로 확인 (보통 `/usr/local/bin`)

> [!INFO]
> **Shell Script가 무엇인가요?**
>
> Shell Script는 터미널에서 `idea .` 같은 명령어로 IDE를 실행할 수 있게 해주는 실행 파일입니다.
> JetBrains Toolbox가 자동으로 생성해주며, 설치된 모든 JetBrains IDE에 대해 명령어를 만들어줍니다.

설정 완료 후 터미널에서 IntelliJ를 바로 실행할 수 있습니다.

현재 위치의 프로젝트를 IntelliJ로 열려면 터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
# 현재 디렉토리를 IntelliJ로 열기
idea .
```

특정 경로의 프로젝트를 열려면 터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
# 특정 프로젝트 열기
idea ~/projects/my-project
```

[돌아가기](macos-step01-essential-developer-tools)
