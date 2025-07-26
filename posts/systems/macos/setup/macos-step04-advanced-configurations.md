---
title: macOS 꿀팁 모음
dates:
  - "2025-07-22T16:09:12.000Z"
  - "2025-07-22T15:45:32.000Z"
  - "2025-07-21T15:45:51.000Z"
  - "2025-07-21T15:14:46.000Z"
authors:
  - XIYO
tags:
  - mac-setup
  - macos-tips
  - shortcuts
  - productivity
  - screenshot
  - spotlight
---

# macOS 꿀팁 모음

> [!NOTE]
> **개발자가 알아두면 좋은 macOS 기능들**
> 맥을 더 효율적으로 사용할 수 있는 숨겨진 기능들을 소개합니다.

## 스크린샷 & 화면 녹화

### 기본 스크린샷 단축키

- `Cmd + Shift + 3`: 전체 화면 캡처
- `Cmd + Shift + 4`: 영역 선택 캡처
- `Cmd + Shift + 4 + Space`: 특정 창 캡처

### 그림자 없이 창 캡처하기

`Cmd + Shift + 4` → `Space`로 창 캡처 모드 진입 후:

- **Option 키를 누른 채로 클릭**: 그림자 없이 캡처
- **그냥 클릭**: 그림자 포함 캡처

> [!TIP]
> Option 키를 누르면 창 주변의 그림자 미리보기가 사라집니다.

### 화면 녹화

`Cmd + Shift + 5`를 누르면 스크린샷과 화면 녹화 도구가 나타납니다:

- 전체 화면 녹화
- 선택 영역 녹화
- 타이머 설정 가능
- 마이크 음성 포함/제외 선택

## 애플리케이션 관리

### 강제 종료 (Force Quit)

앱이 응답하지 않을 때:

1. **방법 1**: `Cmd + Option + Esc` → 앱 선택 → Force Quit
2. **방법 2**: Dock에서 앱 아이콘을 Option 키 누른 채로 우클릭 → Force Quit
3. **방법 3**: Activity Monitor 사용 (`Cmd + Space` → "Activity Monitor")

### 빠른 앱 종료

`Cmd + Q` 대신 `Cmd + Option + Q`를 누르면 확인 없이 즉시 종료됩니다.

## 파일 관리 꿀팁

### 숨김 파일 보기/숨기기

Finder에서 `Cmd + Shift + .` (마침표)를 누르면 숨김 파일이 토글됩니다.

### 파일 경로 복사

Finder에서 파일 선택 후:

- `Option + Cmd + C`: 파일 경로를 클립보드에 복사

### Quick Look

파일을 선택하고 `Space`를 누르면 미리보기가 가능합니다.

- 코드 파일도 문법 강조와 함께 미리보기
- 여러 파일 선택 후 Space로 슬라이드쇼 가능

## 텍스트 편집 단축키

### 이맥스 스타일 단축키

macOS는 모든 텍스트 입력창에서 이맥스 단축키를 지원합니다:

> [!INFO]
> **이맥스(Emacs)란?**
> 1970년대에 만들어진 텍스트 에디터로, 효율적인 텍스트 편집을 위한 단축키 체계를 가지고 있습니다. macOS는 이 단축키들을 시스템 전체에서 지원합니다.

- `Ctrl + A`: 줄 시작으로
- `Ctrl + E`: 줄 끝으로
- `Ctrl + K`: 커서부터 줄 끝까지 삭제
- `Ctrl + D`: 커서 오른쪽 문자 삭제
- `Option + ←/→`: 단어 단위 이동
- `Option + Delete`: 단어 단위 삭제

### 특수 문자 입력

`Ctrl + Cmd + Space`로 이모지 & 특수문자 팝업을 띄울 수 있습니다.

## Spotlight 검색 활용

`Cmd + Space`로 Spotlight를 열고:

- 계산기: `2+2`, `100*1.1` 등 직접 계산
- 단위 변환: `100cm in inches`, `32c in f`
- 파일 타입으로 검색: `kind:pdf`, `kind:image`
- 날짜로 검색: `created:today`, `modified:yesterday`

## 추가 꿀팁

### 여러 파일 이름 한 번에 변경

Finder에서 여러 파일 선택 → 우클릭 → "Rename X Items..."

- Replace Text: 특정 텍스트 찾아 바꾸기
- Add Text: 파일명 앞/뒤에 텍스트 추가
- Format: 순차적으로 번호 매기기

### 클립보드 히스토리

텍스트를 복사할 때 실수로 덮어쓴 경우:

- 많은 앱에서 `Cmd + Shift + V`로 클립보드 히스토리 접근 가능
- 또는 Raycast/Alfred 같은 런처 앱 활용

### 창 최소화 단축키

`Cmd + M`으로 현재 창을 Dock으로 최소화
`Cmd + Option + M`으로 현재 앱의 모든 창을 최소화

### 맥 절전모드 방지 (caffeinate)

맥을 서버로 사용하거나 긴 작업 중 절전모드를 막고 싶을 때:

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
# 기본 사용 (Ctrl+C로 종료할 때까지)
caffeinate

# 1시간 동안만 절전모드 방지
caffeinate -t 3600

# 특정 프로세스가 실행되는 동안만 절전모드 방지
caffeinate -i npm run build
```

> [!TIP]
> `caffeinate -d`는 디스플레이도 꺼지지 않게 합니다.

## 마무리

> [!SUCCESS]
> 이제 맥을 훨씬 더 효율적으로 사용할 수 있습니다!
> 개발하면서 막히는 부분이 있으면 언제든 다시 확인하세요.
