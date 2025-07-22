---
title: Terminal Customization
authors:
  - XIYO
dates:
  - Thu Jul 17 2025 09:00:00 GMT+0900 (대한민국 표준시)
tags:
  - mac-setup
  - terminal
  - oh-my-zsh
  - powerlevel10k
  - iterm2
  - zsh
---

# 터미널 꾸미기 가이드

> [!NOTE]
> **사전 요구사항**
> [개발자 필수 도구 설치](macos-step01-essential-developer-tools)가 완료되어야 합니다.

## Oh My Zsh란?

Oh My Zsh는 터미널을 더 예쁘고 편리하게 만들어주는 도구입니다. 
명령어를 입력할 때 자동완성이 되고, 색깔로 구분해서 보여주며, Git 정보도 한눈에 볼 수 있게 해줍니다.

> [!INFO]
> **Oh My Zsh가 제공하는 기능들**
> 
> - **테마**: 터미널의 모양과 색상을 바꿔줍니다
> - **플러그인**: 자동완성, 구문 강조 등 편의 기능을 추가합니다
> - **별칭**: 긴 명령어를 짧게 줄여서 사용할 수 있습니다
> - **Git 정보**: 현재 브랜치와 상태를 프롬프트에 표시합니다

## Oh My Zsh 설치

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

설치 중 나타나는 질문에는 **Y**를 입력하세요:

- "Do you want to change your default shell to zsh?" → **Y** 입력

> [!INFO]
> **설치 후 자동으로 일어나는 일들**
> 
> 1. 기존 `.zshrc` 파일이 `.zshrc.pre-oh-my-zsh`로 백업됩니다
> 2. 새로운 `.zshrc` 파일이 생성되어 Oh My Zsh가 활성화됩니다
> 3. 기본 테마가 적용되어 터미널 모양이 바뀝니다

## 테마와 플러그인 설치

Oh My Zsh가 설치되었다면, 이제 더 멋진 테마와 유용한 플러그인들을 설치해보겠습니다.

### 설치할 구성요소들

- **Powerlevel10k**: 가장 인기 있는 터미널 테마 (빠르고 예쁨)
- **zsh-autosuggestions**: 이전에 입력한 명령어를 회색으로 미리 보여줌
- **zsh-syntax-highlighting**: 올바른 명령어는 초록색, 틀린 명령어는 빨간색으로 표시

### Powerlevel10k 테마 설치

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

### zsh-autosuggestions 플러그인 설치

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### zsh-syntax-highlighting 플러그인 설치

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### 설정 파일 업데이트

설치된 테마와 플러그인을 활성화하기 위해 설정을 업데이트합니다:

```bash
# 테마 변경
sed -i '' 's/ZSH_THEME=".*"/ZSH_THEME="powerlevel10k\/powerlevel10k"/' ~/.zshrc

# 플러그인 활성화 
sed -i '' 's/plugins=(.*)/plugins=(git docker docker-compose zsh-autosuggestions zsh-syntax-highlighting)/' ~/.zshrc

# 설정 적용
source ~/.zshrc
```

> [!INFO]
> **활성화되는 플러그인들**
> 
> - **git**: Git 관련 별칭과 정보 표시
> - **docker**: Docker 명령어 자동완성
> - **docker-compose**: Docker Compose 자동완성
> - **zsh-autosuggestions**: 명령어 제안 기능
> - **zsh-syntax-highlighting**: 명령어 구문 강조


## iTerm2 컬러 테마 변경하기

터미널을 더 예쁘게 만들고 싶다면 컬러 테마를 바꿔보세요.

> [!INFO]
> **컬러 테마란?**
> 
> 터미널의 배경색, 글자색, 강조색 등을 전체적으로 바꿔주는 색상 조합입니다.
> iTerm2에는 기본으로 제공되는 테마들이 있고, 추가로 다운로드할 수도 있습니다.

### 기본 제공 테마로 변경하기

먼저 iTerm2에 내장된 테마들을 확인해보세요:

1. **iTerm2 → Settings → Profiles → Colors**
2. 우측 하단 **"Color Presets..."** 드롭다운 클릭
3. 다음과 같은 기본 테마들이 있습니다:
   - **Dark Background** (기본 다크 테마)
   - **Light Background** (밝은 테마)
   - **Pastel (Dark Background)** (파스텔 계열)
   - **Solarized Dark** (인기 있는 다크 테마)
   - **Solarized Light** (인기 있는 밝은 테마)
   - **Tango Dark** / **Tango Light**
4. 원하는 테마를 클릭하여 즉시 적용

### 더 많은 테마 설치하기

기본 테마가 마음에 들지 않는다면, 수백 가지의 추가 테마를 다운로드할 수 있습니다.

#### 인기 테마 추천

- **Dracula**: 다크 퍼플 계열의 인기 테마
- **Tokyo Night**: 모던한 다크 테마  
- **Gruvbox Dark**: 따뜻한 색감의 레트로 테마
- **Catppuccin**: 파스텔톤의 부드러운 테마
- **Nord**: 차가운 블루 계열의 미니멀 테마

#### 추가 테마 다운로드 및 설치

1. [iTerm2 Color Schemes](https://iterm2colorschemes.com) 웹사이트 방문
2. 마음에 드는 테마 미리보기 확인
3. 테마 이름 링크를 **오른쪽 클릭** → **"파일을 다운로드에 내려받기"** 선택하여 `.itermcolors` 파일 다운로드
4. iTerm2로 돌아가서:
   - **Settings → Profiles → Colors**
   - **"Color Presets..."** → **"Import..."** 클릭
   - 다운로드한 `.itermcolors` 파일 선택
   - 가져온 테마를 **"Color Presets..."**에서 선택하여 적용

> [!INFO]
> **다운로드한 테마 파일 삭제 가능**
> 
> iTerm2로 테마를 Import하면 설정이 복제되어 저장되므로, 
> 다운로드 폴더에 있는 `.itermcolors` 파일은 삭제해도 됩니다.

> [!TIP]
> **테마 선택 팁**
> 
> - 장시간 코딩한다면 다크 테마가 눈이 편합니다

## Powerlevel10k 설정 마법사

터미널을 재시작하면 Powerlevel10k 설정 마법사가 자동으로 시작됩니다.

### MesloLGS NF 폰트 설치 안내

설정 마법사 시작 전에 MesloLGS NF 폰트 설치를 권유하는 화면이 나타납니다:

> [!IMPORTANT]
> **Powerlevel10k 폰트 설치 프로세스**
> 
> 1. **"Install Meslo Nerd Font?"** 질문이 나타나면 → **y** 입력
> 2. Powerlevel10k가 자동으로 MesloLGS NF 폰트를 다운로드하고 설치합니다
> 3. **iTerm2 설정도 자동으로 변경됩니다** (폰트가 MesloLGS NF로 바뀜)
> 
> 이 폰트는 Powerlevel10k에 최적화되어 있지만, 한글이 잘 안 보일 수 있습니다.

### 설정 마법사 진행

> [!INFO]
> **설정 마법사란?**
> 
> Powerlevel10k가 여러 질문을 통해 사용자 취향에 맞는 프롬프트 스타일을 만들어주는 기능입니다.
> 아이콘 지원 여부, 색상 스타일, 정보 표시 방식 등을 선택할 수 있습니다.

### 추천 설정 (초보자용)

각 질문에 다음과 같이 선택하는 것을 권장합니다:

- **Diamond** → **y** (다이아몬드 아이콘이 보이면 y)
- **Lock** → **y** (자물쇠 아이콘이 보이면 y)  
- **Debian** → **y** (데비안 로고가 보이면 y)
- **Style** → **3 (Rainbow)** (가장 인기 있는 컬러풀한 스타일)
- **Character Set** → **1 (Unicode)** (유니코드 문자 사용)
- **Prompt Style** → **3 (Pure)** (깔끔한 2줄 스타일)
- **Transient Prompt** → **n** (기본값 유지)
- **Instant Prompt** → **1 (Verbose)** (빠른 시작)

### 한글 폰트로 다시 변경하기

Powerlevel10k 설정이 끝나면 iTerm2 폰트가 MesloLGS NF로 바뀌어 있을 겁니다.
한글을 제대로 표시하려면 D2Coding Nerd Font로 다시 변경해야 합니다:

1. **iTerm2 → Settings** (또는 `Cmd + ,`)
2. **Profiles → Text** 탭 선택
3. **Font** 섹션에서 현재 "MesloLGS NF"로 되어 있는 것을 확인
4. **Change Font** 클릭
5. **"D2CodingLigature Nerd Font"** 선택
6. 크기는 **14pt** 권장

> [!INFO]
> **왜 폰트를 두 번 설정하나요?**
> 
> - **MesloLGS NF**: Powerlevel10k가 권장하는 폰트로, 모든 아이콘이 완벽하게 표시되지만 한글 표시가 최적화되지 않았습니다
> - **D2Coding Nerd Font**: 한글과 영문, 아이콘을 모두 잘 표시하는 한국 개발자용 폰트입니다
> 
> Powerlevel10k 설정 중에는 MesloLGS NF를 사용하고, 설정 후에 D2Coding으로 바꾸는 것이 가장 좋습니다.

> [!TIP]
> 설정을 잘못했거나 나중에 바꾸고 싶다면 언제든지 다시 설정할 수 있습니다:
> 
> ```bash
> p10k configure
> ```

## 설치 확인

모든 설치가 올바르게 되었는지 확인해보겠습니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
echo $ZSH_THEME  # powerlevel10k/powerlevel10k 출력되어야 함
echo $SHELL      # /bin/zsh 출력되어야 함
```

### 정상 설치 확인 포인트

1. **터미널 프롬프트**: Git 브랜치명, 폴더 아이콘 등이 표시됨
2. **자동완성**: 명령어 입력 시 회색 글씨로 제안이 나타남  
3. **구문 강조**: 올바른 명령어는 초록색, 틀린 명령어는 빨간색
4. **아이콘**: Nerd Font 아이콘들이 깨지지 않고 정상 표시

## 추가 팁

### 유용한 Oh My Zsh 별칭들

Oh My Zsh가 제공하는 편리한 단축 명령어들:

- `ll` - `ls -l` (자세한 파일 목록)
- `la` - `ls -la` (숨김 파일 포함 목록)
- `..` - `cd ..` (상위 폴더로)
- `...` - `cd ../..` (두 단계 위로)
- `gst` - `git status` (Git 상태 확인)
- `gaa` - `git add --all` (모든 변경사항 추가)
- `gcmsg` - `git commit -m` (커밋 메시지와 함께 커밋)

### Powerlevel10k 고급 설정

더 많은 설정을 원한다면 `~/.p10k.zsh` 파일을 편집할 수 있습니다:

```bash
# 설정 파일 편집
code ~/.p10k.zsh  # VS Code로 열기
```

> 처음에는 그냥 기본 설정으로 사용하는 것을 권장합니다. 
> 터미널에 익숙해진 후에 커스터마이징해보세요!

[돌아가기](macos-step01-essential-developer-tools)
