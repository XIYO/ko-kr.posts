---
title: INSTALL RSYNC
description: 라우터에 nginx를 구동중 입니다. \
authors:
  - XIYO
lastModified: 2025-07-26T11:55:18+09:00
published: 2025-07-22T00:45:51+09:00
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
