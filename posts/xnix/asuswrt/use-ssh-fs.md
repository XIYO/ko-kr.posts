---
authors:
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
dates:
  - '2024-09-10T20:23+0900'
  - '2024-08-11T03:10+0900'
  - '2024-08-11T00:26+0900'
  - '2024-08-09T19:22+0900'
  - '2024-03-23T22:30+0900'
  - '2024-03-16T12:06+0900'
  - '2024-03-12T20:50+0900'
  - '2023-10-22T20:29+0900'
  - '2023-10-22T20:28+0900'
  - '2023-10-22T18:44+0900'
  - '2023-10-22T18:43+0900'
  - '2023-10-22T18:42+0900'
  - '2023-10-22T18:34+0900'
  - '2023-10-22T18:20+0900'
  - '2023-10-22T13:48+0900'
  - '2023-10-22T13:15+0900'
  - '2023-10-22T13:08+0900'
  - '2023-10-22T12:08+0900'
  - '2023-10-22T12:08+0900'
  - '2023-10-22T12:07+0900'
  - '2023-10-22T12:04+0900'
  - '2023-10-22T00:13+0900'
  - '2023-10-21T23:59+0900'
messages:
  - ':art: 리소스 경로를 규격에 맞게 통일'
  - 'Revert ":truck: 포스트 데이터 이동"'
  - ':truck: 포스트 데이터 이동'
  - ':art: 프리티어 실행'
  - ':truck: 마크다운 파일명 변경 및 구조 변경'
  - ':fire: asuswrt를 xnix 하위로 이동'
  - ':lipstick: 스벨트킷으로 변경'
  - "\U0001F4DD improve sentence"
  - "\U0001F4DD improve sentence"
  - "\U0001F4DD Improve sectence"
  - "\U0001F4DD Move and edit sentence"
  - ✏️ remove asterisks from korean text
  - ✏️ Update official notaion
  - ✏️ Fix typo
  - "\U0001F4DD Add step-by-step explanation, image"
  - "\U0001F4DD Improve readability of the text"
  - "\U0001F69A ./resoureces -> /assets/resources"
  - "\U0001F4DD Add blank line"
  - "\U0001F4DD Remove whitespace"
  - "\U0001F4DD Improve readability of the text"
  - "\U0001F4DD add image"
  - "\U0001F4DD add other solution"
  - "\U0001F331 USE SSH FS"
title: USE SSH FS
---
# USE SSH FS

![*VS Code*에서 *SSH FS*으로 연결한 화면](/static/resources/2023-10-22-11-55-54.png)

*VS Code*의 *SSH FS*를 사용하여 편리하게 파일을 관리하는 방법을 알아봅니다.

*라우터*에 자주 접속해서 작업을 하다보면, 관리할 파일이 점점 많아집니다. \
그래서 조금 더 편리한 작업을 위해 *VS Code*를 이용하여 파일을 관리 할 수 있도록 기능을 추가했습니다.

최초에는 *Vim*을 설치하고 플러그인을 사용해서 작업을 할까 고민했는데, _Vim_ 설치시 생기는 오류도 확인할 시간도 없고, 플러그인 관리도 잘 할 수 있을지 걱정이들었습니다.

그래서 라우터에 _VS Code_ 서버 버전을 설치하여 작업하려고 했는데, 역시 지원하지 않는 환경이라서 포기하였습니다.

고민 끝에 나온 생각은, 네트워크 파일을 마운트해서 로컬에서 *VS Code*로 작업할 수 없을까 하면서 찾아본 솔루션이 *SSH FS*가 있었습니다. \
*REMOTE FS*라는 확장 기능도 있지만, 설명이 너무 부실하고 마지막 업데이트도 2019년 5월 5일이라 제외했습니다.

## WHAT IS _SSH FS_

*SSH FS*는 *VS Code*의 확장 기능 이며, *SSH FS*는 내부적으로 *SSHFS*를 사용합니다.

*SSHFS*는 *Secure Shell File System*의 약자이며, *SSH*를 통해 *파일 시스템*을 마운트하는 도구입니다. \
*VS Code*를 서버 버전으로 설치할 수 없는 환경에서 유용합니다.

## ENVIRONMENT

- **HARDWARE**: \
  _AC88U_
- **FIRMWARE**: \
  _asuswrt-merlin 386.12_
- **PACKAGE**: \
  _Entware armv7sf-k2.6_

## REQUIREMENTS

- **_SSH_ 접근 허용**
- **_Entware_ 설치**

## METHOD

1. **_openssl-sftp_ 설치**:

   1. *SSH*로 라우터에 접속
   2. 명령어 실행

      ```bash
      opkg install openssl-sftp
      ```

      *entware*를 이용해 *openssl-sftp*를 설치합니다.

2. **_SSH FS_ 설치**:
   1. *마켓플레이스*의 [*SSH FS*] 소개 페이지에서 _Install_ 버튼 클릭

## USAGE

![*SSH FS* 설정 화면](/static/resources/2023-10-22-13-40-10.png)

_SSH_ 접속과 동일한 접속 정보를 요구합니다.

0. *프라이머리 사이드 바*에서 _SSH FS_ 버튼 클릭
1. _사이드 바_ 확장 영역에서 설정 생성 버튼 클릭
2. 설정 정보를 입력 화면에서 _SSH_ 접속 정보를 입력
3. 하단에 있는 _SAVE_ 버튼 클릭
4. _사이드 바_ 확장 영역에서 생성된 접속 정보를 보고 클릭 \
   왼쪽은 _디렉토리_ 마운트 기능, 오른쪽은 _터미널_ 연결 입니다.

> *VS Code*의 설정을 *GitHub*와 동기화 하면 더욱 편리하게 사용할 수 있습니다.

[*SSH FS*]: https://marketplace.visualstudio.com/items?itemName=Kelvin.VSCODE-sshfs
