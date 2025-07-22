---
title: "Obsidian 설정 가이드"
description: "효율적인 노트 작성을 위한 Obsidian 필수 설정 및 구성"
authors:
  - XIYO
dates:
  - Thu Jul 17 2025 09:00:00 GMT+0900 (대한민국 표준시)
tags: obsidian, settings, essential, first-setup
---

# Obsidian 설정 가이드

Obsidian은 마크다운 기반의 강력한 노트 앱입니다. 로컬 파일로 저장되어 영구적으로 소유할 수 있고, 링크와 그래프 뷰를 통해 지식을 연결하여 관리할 수 있습니다. 개발 문서, 학습 노트, 아이디어를 체계적으로 정리하는데 최적화되어 있습니다.

### Notion과의 주요 차이점

| 특징 | Obsidian | Notion |
|------|----------|--------|
| **데이터 저장** | 로컬 마크다운 파일 | 클라우드 전용 |
| **속도** | 매우 빠름 (로컬) | 인터넷 속도에 의존 |
| **오프라인 사용** | 완전 지원 | 제한적 |
| **파일 소유권** | 100% 사용자 소유 | 서비스 종속적 |
| **커스터마이징** | 플러그인으로 무한 확장 | 제한된 블록 기반 |
| **가격** | 무료 (동기화만 유료) | 무료 제한, 유료 필수 |
| **학습 곡선** | 초기 설정 필요 | 바로 사용 가능 |

Obsidian은 개발자나 장기적인 지식 관리가 필요한 사용자에게 적합하며, 데이터를 완전히 통제하고 싶은 경우 최선의 선택입니다.

## Obsidian 초기 설정

### 첫 실행 및 Vault 생성
1. Obsidian 실행
2. "Create new vault" 선택
3. Vault 이름 입력 (예: "Dev Notes", "Knowledge Base")
4. 저장 위치 선택

> [!WARNING]
> **반드시 처음에 설정하세요**
> 나중에 변경하면 기존 노트들을 수정해야 할 수 있습니다.

## 필수 설정

### 마크다운 링크 사용 (Wiki 링크 OFF)

Settings (Cmd+,) → Files & Links:
- **Use `Wikilinks`**: OFF
- **Relative path to file**: ON

> [!INFO]
> Wiki 링크 `[[파일명]]` 대신 표준 마크다운 `[텍스트](파일명)`를 사용합니다.
> GitHub, VS Code 등 다른 마크다운 에디터와 호환됩니다.

### 첨부 파일 정리 (assets 폴더)

Settings → Files & Links:
- **Default location for new attachments**: "In the folder specified below"
- **Attachment folder path**: `assets`

이미지나 파일을 드래그하면:
```
[DIR] Vault 루트/
  [DIR] assets/        ← 모든 첨부 파일이 여기에
    [IMG] image1.png
    [IMG] image2.png
  [DIR] notes/
    [FILE] 노트1.md
    [FILE] 노트2.md
```

> [!INFO]
> **링크 자동 업데이트**: Automatically update internal links를 ON으로 설정하면 파일 이름이 바뀔 때 링크도 자동으로 업데이트됩니다.

### 화면 전체 사용

Settings → Editor:
- **Readable line length**: OFF

좁은 영역이 아닌 화면 전체를 사용해서 글을 작성할 수 있습니다.

## 추가 권장 설정

### 외관 설정
Settings → Appearance에서:
- **Base theme**: Dark/Light (취향대로)
- **Translucent window**: ON (Mac에서 예쁨)

### 자동 저장
Settings → Editor에서:
- **Autosave after delay**: 2 (2초 후 자동 저장)

### 편집기 설정
Settings → Editor에서:
- **Show line numbers**: ON (코드 작성 시 유용)
- **Show frontmatter**: ON (메타데이터 표시)
- **Fold heading**: ON (긴 문서 관리)
- **Fold indent**: ON (들여쓰기 접기)
- **Tab size**: 2 또는 4 (코드 스타일에 맞춰)
- **Use tabs**: OFF (스페이스 사용 권장)

### 파일 및 폴더 설정
Settings → Files & Links에서:
- **Excluded files**:
  ```
  .DS_Store
  .git/
  node_modules/
  ```

### 새 파일 템플릿
Settings → Core plugins → Templates 활성화 후:
1. Templates 폴더 위치 지정
2. 기본 템플릿 파일 생성

## 설정 확인

새 노트를 만들어서 테스트:

1. **링크 테스트**:
   - `Cmd + K`로 링크 생성 → `[](test)` 형식인지 확인

2. **이미지 테스트**:
   - 이미지 드래그 → `assets` 폴더에 저장되는지 확인

3. **화면 테스트**:
   - 긴 문장 입력 → 화면 끝까지 텍스트가 표시되는지 확인

> [!INFO]
> **설정 완료**
>
> 이제 Obsidian을 효율적으로 사용할 준비가 되었습니다.

## 필수 단축키 & 기본 기능 활성화

### 핵심 단축키 (반드시 알아야 할 것들)
- `Cmd + P`: **커맨드 팔레트** (모든 명령 실행)
- `Cmd + O`: **빠른 전환** (파일 검색 및 열기)
- `Cmd + N`: 새 노트 생성
- `Cmd + Shift + N`: 새 노트 생성 (새 창에서)
- `Cmd + W`: 현재 탭 닫기
- `Cmd + Shift + F`: 전체 Vault 검색
- `Cmd + F`: 현재 노트에서 검색
- `Cmd + E`: 편집/읽기 모드 전환
- `Cmd + K`: 링크 삽입
- `Cmd + B`: **굵게**
- `Cmd + I`: *기울임*

### 숨겨진 기본 기능 활성화

#### 녹음 기능 활성화
Settings → Core plugins → **Audio recorder** 활성화

사용법:
- 녹음 시작: 왼쪽 사이드바 마이크 아이콘 클릭
- 단축키 설정: Settings → Hotkeys → "Start/stop recording" 검색
- 추천 단축키: `Cmd + Shift + R`
- 녹음 파일은 자동으로 assets 폴더에 저장

#### 슬라이드 프레젠테이션
Settings → Core plugins → **Slides** 활성화

사용법:
- 노트에 `---`로 슬라이드 구분
- 커맨드 팔레트 → "Start presentation" 실행
- 프레젠테이션 모드로 전환

#### 캔버스 (무한 화이트보드)
Settings → Core plugins → **Canvas** 활성화

사용법:
- `Cmd + N` → 파일 형식에서 "Canvas" 선택
- 노트, 이미지, 링크를 시각적으로 연결
- 마인드맵, 플로우차트 작성 가능

#### 일일 노트
Settings → Core plugins → **Daily notes** 활성화

설정:
- Date format: `YYYY-MM-DD`
- New file location: `daily/` (폴더 자동 생성)
- Template file location: 템플릿 설정 가능

### 파워 유저 단축키
- `Cmd + P` 후 `>`: 커맨드만 표시
- `Cmd + P` 후 `#`: 태그 검색
- `Cmd + P` 후 `^`: 제목 검색
- `Cmd + [` / `Cmd + ]`: 뒤로/앞으로 가기
- `Option + Enter`: 링크를 새 창에서 열기
- `Cmd + Option + ←/→`: 탭 이동
- `Cmd + \`: 사이드바 토글

### 커스텀 단축키 필수 설정
Settings → Hotkeys에서 추가:
- **Toggle left sidebar**: `Cmd + 1`
- **Toggle right sidebar**: `Cmd + 2`
- **Focus on editor**: `Cmd + 0`
- **Move line up/down**: `Option + ↑/↓`
- **Delete paragraph**: `Cmd + D`
- **Open in default app**: `Cmd + Option + O`

## 노트 작성 팁

### 링크 활용 (마크다운 형식)
- `[노트 이름](노트이름)`: 다른 노트로 링크
- `[섹션 링크](노트이름#헤딩)`: 특정 섹션으로 링크

### 태그 시스템
- `#project/frontend`: 계층적 태그 사용
- `#todo`, `#idea`, `#bug`: 상태 관리
- 태그 패널에서 한눈에 확인

### 일일 노트 활용
매일 아침 일일 노트를 만들어:
- 할 일 목록 작성
- 학습한 내용 정리
- 아이디어 메모

## 다음 단계

기본 설정이 끝났다면:
- [마크다운 기본 기능](markdown-basics) - Mermaid, LaTeX, Callout 등
- [동기화 설정](obsidian-step01-sync-settings) - Git, Cloud, Obsidian Sync