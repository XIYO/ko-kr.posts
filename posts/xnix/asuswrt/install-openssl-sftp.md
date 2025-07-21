---
authors:
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
dates:
  - '2024-08-11T03:10+0900'
  - '2024-08-11T00:26+0900'
  - '2024-03-23T22:30+0900'
  - '2024-03-16T12:06+0900'
  - '2024-03-12T20:50+0900'
  - '2023-10-17T22:43+0900'
  - '2023-10-17T21:42+0900'
messages:
  - 'Revert ":truck: 포스트 데이터 이동"'
  - ':truck: 포스트 데이터 이동'
  - ':truck: 마크다운 파일명 변경 및 구조 변경'
  - ':fire: asuswrt를 xnix 하위로 이동'
  - ':lipstick: 스벨트킷으로 변경'
  - "\U0001F527 Add Prefix for Error Prevention"
  - "\U0001F331 INSTALL OPENSSL AND SFTP ON ASUSWRT"
title: INSTALL OPENSSL AND SFTP ON ASUSWRT
---
# INSTALL OPENSSL AND SFTP ON ASUSWRT

`Dropbear`에 `SFTP` 기능을 추가하는 방법을 설명합니다.

`Dropbear`는 `OpenSSH`의 경량 패키지 입니다. \
`OpenSSH`의 일부 기능을 제거하면서 `SFTP`까지 제거 되었습니다.

## ENVIRONMENT

- `ASUSWRT-MERLIN 386.12`
- `Entware armv7sf-k2.6`

## METHOD

```bash
opkg update
opkg install openssh-sftp-server
```

패키지 매니저의 업데이트와 설치를 진행합니다.

설치 후에는 다른 설정없이 바로 접근할 수 있습니다.
