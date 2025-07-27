---
title: INSTALL OPENSSL AND SFTP ON ASUSWRT
description: "`Dropbear`에 `SFTP` 기능을 추가하는 방법을 설명합니다."
dates:
  - "2025-07-21T15:45:51.000Z"
  - "2025-07-21T15:14:46.000Z"
  - "2025-07-21T14:15:35.000Z"
  - "2025-06-15T06:10:59.000Z"
  - "2024-08-10T18:10:10.000Z"
  - "2024-08-10T15:26:13.000Z"
  - "2024-03-23T13:30:14.000Z"
  - "2024-03-16T03:06:53.000Z"
  - "2024-03-12T11:50:16.000Z"
  - "2023-10-17T13:43:06.000Z"
  - "2023-10-17T12:42:39.000Z"
authors:
  - XIYO
lastModified: 2025-07-26T11:55:18+09:00
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
