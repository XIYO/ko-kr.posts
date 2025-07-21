---
authors:
  - XIYO
  - XIYO
  - XIYO
  - XIYO
dates:
  - '2024-08-11T03:10+0900'
  - '2024-08-11T00:26+0900'
  - '2024-08-09T19:22+0900'
  - '2024-03-24T16:54+0900'
messages:
  - 'Revert ":truck: 포스트 데이터 이동"'
  - ':truck: 포스트 데이터 이동'
  - ':art: 프리티어 실행'
  - ':seedling: install-rsync.md'
title: INSTALL RSYNC
description: '라우터에 nginx를 구동중 입니다. '
---
# INSTALL RSYNC

라우터에 nginx를 구동중 입니다. \
랜딩 페이지를 구성중이기 때문에 자동 배포를 위해서 rsync를 설치 합니다.

## ENVIRONMENT

작업 당시의 환경 입니다.

- AC88U
- Merlin 386.12_4
- Entware 2022-02-24

## REQUIREMENTS

필수 요소 입니다. 자세한 설명은 생략합니다.

- Merlin firmware 설치
- Entware 설치
- jffs partition 활성화
- ssh 활성화

## INSTALL

```bash
opkg update
opkg install rsync
```
