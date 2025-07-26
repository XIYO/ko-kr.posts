---
title: Karabiner-Elements 설정 가이드
description: >-
  Karabiner-Elements는 macOS의 키보드 동작을 자유롭게 커스터마이징할 수 있는 강력한 도구입니다. 이 가이드에서는 가장
  유용한 세 가지 설정을 다룹니다.
dates:
  - "2025-07-21T15:45:51.000Z"
  - "2025-07-21T15:14:46.000Z"
authors:
  - XIYO
tags:
  - mac-setup
  - karabiner
  - keyboard
  - productivity
---

# Karabiner-Elements 설정 가이드

Karabiner-Elements는 macOS의 키보드 동작을 자유롭게 커스터마이징할 수 있는 강력한 도구입니다. 이 가이드에서는 가장 유용한 세 가지 설정을 다룹니다.

## Karabiner-Elements 설치

터미널을 열고 Homebrew로 설치합니다:

```bash
brew install --cask karabiner-elements
```

설치 후 시스템 권한을 허용해야 합니다:
1. 시스템 설정 → 개인정보 보호 및 보안
2. 입력 모니터링에서 Karabiner 관련 항목 모두 허용

## 기본 설정: 한영 전환 개선

### 오른쪽 Command를 한영키로 변경

macOS의 기본 한영 전환(Caps Lock)은 딜레이가 있어 불편합니다. 오른쪽 Command 키를 한영 전환으로 바꿔보겠습니다.

Karabiner-Elements를 실행하고 다음과 같이 설정합니다:

1. **Simple Modifications** 탭 클릭
2. **Add item** 버튼 클릭
3. From key: `right_command` → To key: `f18` 선택

macOS 키보드 설정에서 한영 전환 단축키를 변경합니다:

1. 시스템 설정 → 키보드 → 단축키 → 입력 소스
2. "입력 메뉴에서 다음 소스 선택" 클릭
3. 오른쪽 Command 키 누르기 (F18로 인식됨)

이제 오른쪽 Command 키로 즉시 한영 전환이 가능합니다.

## Ultimate macOS 설치하기

Ultimate macOS는 수십 가지의 유용한 키보드 설정이 포함된 종합 패키지입니다. 한 번 설치하면 필요한 기능만 골라서 활성화할 수 있습니다.

### 설치 방법

1. Karabiner-Elements 실행
2. **Complex Modifications** 탭 이동
3. **Add rule** 버튼 클릭
4. **Import more rules from the Internet** 클릭
5. 검색창에 **"ultimate macOS"** 입력
6. **"ultimate macOS"** by suliveevil 선택 후 **Import**

### Vim 스타일 방향키 설정 (hjkl)

Ultimate macOS를 설치했다면 다양한 Vim 관련 설정을 사용할 수 있습니다.

#### Vi Mode 활성화하기

1. Complex Modifications에서 Ultimate macOS 규칙 목록 확인
2. 다음 중 하나를 선택하여 **Enable**:
   - **"Vi Mode [Hold ⇪ Caps Lock for Vi Mode]"**: Caps Lock을 누르고 있는 동안만 hjkl이 방향키로 작동
   - **"Vi Mode [⌃ Control + hjkl]"**: Control + hjkl로 방향키 사용
   - **"Vi Mode [fn + hjkl]"**: fn + hjkl로 방향키 사용

> [!TIP]
> **추천 설정**
> 
> "Hold ⇪ Caps Lock for Vi Mode"가 가장 실용적입니다.
> Caps Lock을 누른 상태에서만 작동하므로 일반 타이핑에 방해가 되지 않습니다.

#### 사용 가능한 단축키

Vi Mode를 활성화하면 다음 기능들을 사용할 수 있습니다:

- **기본 이동**
  - h: ← (왼쪽)
  - j: ↓ (아래)
  - k: ↑ (위)
  - l: → (오른쪽)

- **확장 이동** (일부 모드에서 지원)
  - w: 다음 단어로 이동
  - b: 이전 단어로 이동
  - 0: 줄의 시작으로
  - $: 줄의 끝으로

### 추가 유용한 기능들

Ultimate macOS에는 다음과 같은 유용한 기능들도 포함되어 있습니다:

#### Hyper Key 설정
"⇪ Caps Lock → Hyper Key (⌃⌥⇧⌘)" 활성화:
- Caps Lock을 특별한 modifier 키로 변경
- 다른 앱과 충돌하지 않는 고유한 단축키 생성 가능

#### 한국어 사용자를 위한 설정
"Korean" 카테고리에서:
- **"⇧ Shift + Space → Switch Input Source"**: Shift+Space로 한영 전환
- **"₩ → ` or ₩ (Hold ⌥ Option)"**: 원화 키를 백틱으로 변경

#### 개발자를 위한 설정
- **"⎋ Escape → ` ~ (Hold ⇧ Shift)"**: ESC 키로 백틱 입력
- **"Delete Line/Word"**: 빠른 삭제 단축키
- **"Emacs Mode"**: Emacs 스타일 단축키 (Control+A/E 등)

## 사용 팁

### 설정 백업
설정을 백업하려면 다음 파일을 저장하세요:
```bash
~/.config/karabiner/karabiner.json
```

### 문제 해결
- 설정이 작동하지 않으면 Karabiner-Elements를 재시작하세요
- 시스템 설정에서 권한이 제대로 부여되었는지 확인하세요
- 다른 키보드 유틸리티와 충돌할 수 있으니 주의하세요

### 원래대로 되돌리기
1. Complex Modifications에서 활성화한 룰 **Remove**
2. Simple Modifications에서 설정 삭제
3. 필요시 Karabiner-Elements 제거:
   ```bash
   brew uninstall --cask karabiner-elements
   ```

> [!TIP]
> **단계별 접근**
> 
> 1. 먼저 한영 전환 개선만 사용해보세요
> 2. Ultimate macOS 설치 후 Vi Mode 하나만 활성화해보세요
> 3. 익숙해지면 더 많은 기능을 하나씩 추가하세요

이제 키보드를 200% 활용할 수 있습니다!