---
title: 프로그래밍 언어 설치
dates:
  - "2025-07-22T16:09:12.000Z"
  - "2025-07-22T15:45:32.000Z"
  - "2025-07-21T19:25:39.000Z"
  - "2025-07-21T15:45:51.000Z"
  - "2025-07-21T15:14:46.000Z"
authors:
  - XIYO
tags:
  - mac-setup
  - java
  - openjdk
  - macos-step03-programming-languages
  - intellij
lastModified: 2025-07-26T11:55:18+09:00
---

# 프로그래밍 언어 설치

> [!NOTE]
> **사전 요구사항**
> [Homebrew 설치](macos-step00-homebrew-installation)가 완료되어야 합니다.

## Java 설치에 대한 조언

> [!INFO]
> **IntelliJ IDEA가 JDK를 자동으로 관리합니다**
> IntelliJ IDEA는 프로젝트별로 필요한 JDK를 다운로드하고 관리합니다. 시스템 전역에 Java를 설치하지 않아도 IntelliJ가 알아서 처리하므로, 꼭 필요한 경우가 아니라면 설치를 미루세요.

### 언제 시스템에 Java를 설치해야 할까요?

다음 경우에만 시스템 전역 Java가 필요합니다:

- 터미널에서 `java` 명령어를 직접 사용할 때
- IntelliJ 없이 Java 애플리케이션을 실행할 때
- CI/CD 파이프라인에서 Java가 필요할 때

## Java 21 OpenJDK 설치 방법

정말 필요하다면 Homebrew로 간단히 설치할 수 있습니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
(brew install openjdk@21 || true)
```

> [!IMPORTANT]
> **JAVA_HOME 설정은 하지 마세요**
> Homebrew가 알아서 PATH를 관리합니다. 옛날 방식처럼 `.zshrc`에 `export JAVA_HOME=...`을 추가할 필요가 없습니다.

## 설치 확인

설치 후 Java가 제대로 작동하는지 확인해보세요.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
java --version
```

아래와 비슷한 메시지가 나오면 성공입니다:

```text
openjdk 21.x.x 2024-xx-xx
OpenJDK Runtime Environment Homebrew (build 21.x.x)
OpenJDK 64-Bit Server VM Homebrew (build 21.x.x, mixed mode, sharing)
```

> [!TIP]
> IntelliJ IDEA는 시스템에 설치된 JDK를 자동으로 인식합니다. 프로젝트 생성 시 목록에서 선택하면 됩니다.

## 다음 단계

필요한 도구들이 모두 준비되었습니다! macOS를 더 효율적으로 사용하는 꿀팁을 알아보세요.

[다음 단계: macOS 꿀팁 모음](macos-step04-advanced-configurations)
