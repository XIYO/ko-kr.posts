---
title: 시스템 유틸리티 설치
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
  - productivity
  - slack
  - notion
  - obsidian
  - chrome
  - rectangle
---

# 시스템 유틸리티 설치

> [!NOTE]
> **사전 요구사항**
> 이 가이드를 진행하기 전에 [Homebrew 설치](macos-step00-homebrew-installation)가 완료되어야 합니다.

## 생산성 도구 한 번에 설치

개발과 협업에 필요한 필수 도구들을 설치합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
(brew install --cask slack || true) && \
(brew install --cask notion || true) && \
(brew install --cask obsidian || true) && \
(brew install --cask google-chrome || true) && \
(brew install --cask rectangle || true) && \
echo "모든 생산성 도구 설치 완료!"
```

> 솔직히 저를 믿고 그냥 설치하세요.
> 무조건 써야하는 도구들입니다.

## 설치된 도구 설명

### 협업 & 커뮤니케이션

- **Slack** - 팀 커뮤니케이션과 협업을 위한 메신저. 개발팀 필수 도구
- **Notion** - 올인원 워크스페이스. 문서, 데이터베이스, 프로젝트 관리 등

### 노트 & 문서

- **Obsidian** - 마크다운 기반의 강력한 노트 앱. 개발 문서나 메모 관리에 최적

### 웹 브라우저

- **Google Chrome** - 개발자 도구가 강력한 웹 브라우저. 웹 개발 필수

### 창 관리

- **Rectangle** - 윈도우 창 크기와 위치를 키보드로 조절하는 무료 도구
  - `Ctrl + Option + ←/→`: 화면 반쪽 차지
  - `Ctrl + Option + ↑`: 전체 화면
  - `Ctrl + Option + ↓`: 창 가운데 정렬

## 추가 권장 도구

개발 스타일에 따라 선택적으로 설치하세요.

## 도구별 초기 설정

### Rectangle 설정

1. Rectangle 실행
2. 접근성 권한 허용
3. Preferences에서 "Launch on login" 체크
4. 필요시 단축키 커스터마이징

### Chrome 설정

1. Chrome 실행 후 기본 브라우저로 설정
2. 개발자 도구 단축키 확인: `Cmd + Option + I`

### Slack 설정

1. 워크스페이스 추가
2. 알림 설정 커스터마이징
3. 다크 모드 설정 (선호 시)

### Obsidian 웹 클리퍼 설정

웹 페이지를 Obsidian으로 바로 저장할 수 있는 확장 프로그램입니다.

#### Chrome용 설치

1. Chrome 웹 스토어에서 "Obsidian Web Clipper" 검색
2. 또는 직접 설치: [Obsidian Web Clipper - Chrome](https://chromewebstore.google.com/detail/obsidian-web-clipper/mphkdfmipddgfobjhphabphmpdckgfhb)
3. 확장 프로그램 추가 후 Obsidian vault 경로 설정

#### Safari용 설치

1. Mac App Store에서 "Obsidian Clipper for Safari" 검색
2. 또는 직접 설치: [Obsidian Clipper - Safari](https://apps.apple.com/app/obsidian-clipper-for-safari/id1640358805)
3. Safari → 설정 → 확장 프로그램에서 활성화
4. Obsidian vault 경로 설정

> [!TIP]
> 단축키 설정: Chrome은 `Cmd + Shift + O`, Safari는 확장 프로그램 설정에서 지정 가능

## 다음 단계

시스템 유틸리티 설치가 완료되었습니다. 다음으로 프로그래밍 언어별 개발 환경을 설정하세요.

[다음 단계: 프로그래밍 언어 설치](macos-step03-programming-languages)
