---
title: Oracle Docker 설치 가이드
description: Docker를 사용하여 Oracle Database Free Edition을 설치하는 방법을 안내합니다. 복잡한 Oracle 설치 과정을 Docker로 단순화하는 방법을 설명합니다.
dates:
  - "2025-07-26T10:00:00.000Z"
  - "2025-07-21T19:25:39.000Z"
  - "2025-07-21T17:41:12.000Z"
  - "2025-07-21T17:40:16.000Z"
  - "2025-07-21T15:45:51.000Z"
  - "2025-07-21T15:14:46.000Z"
authors:
  - XIYO
tags:
  - docker
  - oracle
  - database
  - guide
  - installation
---

# 오라클 1단계 도커 설치

## Docker로 Oracle을 설치하는 이유

전통적인 Oracle 설치는 악명이 높습니다. 수십 GB의 설치 파일을 다운로드하고, 복잡한 설치 마법사를 거쳐야 하며, 커널 파라미터와 사용자 그룹을 설정해야 합니다. 설치에 실패하면 시스템을 깨끗이 정리하는 것도 쉽지 않습니다.

Docker는 이 모든 고통을 해결합니다. Oracle이 미리 설정해둔 이미지를 다운로드하고 실행하기만 하면 됩니다. 설치에 실패해도 컨테이너를 삭제하면 그만입니다.

> [!INFO]
> Oracle의 독특한 개념들(SID, Service Name, CDB/PDB 등)에 대해서는 [오라클 0단계 개념](oracle-step00-concepts)을 먼저 읽어보세요.

## 사전 준비사항

이 가이드는 Docker가 이미 설치되어 있다고 가정합니다. 시스템에 최소 2GB의 여유 메모리와 15GB의 디스크 공간이 필요합니다. Oracle은 가벼운 데이터베이스가 아닙니다.

## 설치 과정 시연

다음 asciinema 녹화에서 전체 설치 과정을 확인할 수 있습니다:

[![asciicast](https://asciinema.xiyo.dev/a/TMALoHqaToMJOxlT9EXnMEsi6.svg)](https://asciinema.xiyo.dev/a/TMALoHqaToMJOxlT9EXnMEsi6)

## Oracle 이미지 다운로드

### Container Registry의 세계

Docker 이미지는 Container Registry라는 저장소에서 관리됩니다. Docker Hub가 가장 유명하지만, 대기업들은 자체 Registry를 운영합니다. Oracle도 container-registry.oracle.com이라는 자체 Registry를 운영합니다.

일반적으로 기업 Registry는 로그인을 요구합니다. 하지만 Oracle은 Free Edition을 개발자 유치 전략으로 활용하여 로그인 없이도 다운로드할 수 있게 했습니다. Enterprise Edition을 사용하려면 결국 Oracle 계정이 필요하겠지만, 학습 목적이라면 Free Edition으로 충분합니다.

### 이미지 다운로드

Oracle Database 23c Free 이미지를 다운로드합니다. 이미지 크기가 약 3GB이므로 네트워크 속도에 따라 시간이 걸릴 수 있습니다.

```bash
docker pull container-registry.oracle.com/database/free:latest
```

다운로드가 완료되면 로컬에 Oracle 이미지가 저장됩니다. 이제 이 이미지로 여러 개의 Oracle 인스턴스를 생성할 수 있습니다.

## Oracle 컨테이너 실행

### 첫 번째 Oracle 인스턴스 만들기

다음 명령어로 Oracle 컨테이너를 실행합니다:

```bash
docker run -d \
  --name oracle-free \
  -p 1521:1521 \
  -p 5500:5500 \
  -e ORACLE_PWD=oracle123 \
  container-registry.oracle.com/database/free:latest
```

명령어의 각 부분이 하는 일을 살펴보겠습니다.

`-d`는 백그라운드에서 실행하라는 의미입니다. Oracle이 시작되는 동안 터미널을 계속 사용할 수 있습니다.

`--name oracle-free`는 컨테이너에 이름을 부여합니다. 이 이름으로 컨테이너를 관리할 수 있습니다.

`-p 1521:1521`은 Oracle의 기본 포트를 호스트에 연결합니다. 1521은 Oracle이 1984년부터 사용해온 전통적인 포트 번호입니다.

`-p 5500:5500`은 Enterprise Manager Express라는 웹 관리 도구의 포트입니다. 브라우저로 Oracle을 관리하고 싶다면 필요합니다.

`-e ORACLE_PWD=oracle123`은 관리자 비밀번호를 설정합니다. SYS, SYSTEM, PDBADMIN 세 계정 모두 이 비밀번호를 사용합니다.

### 고급 설정 옵션

특별한 요구사항이 있다면 추가 옵션을 사용할 수 있습니다.

한글 데이터를 주로 다룬다면 문자셋을 변경할 수 있습니다. `-e ORACLE_CHARACTERSET=KO16MSWIN949`를 추가하면 됩니다. 하지만 기본값인 AL32UTF8도 한글을 완벽히 지원하므로 특별한 이유가 없다면 변경하지 않는 것이 좋습니다.

PDB 이름을 변경하려면 `-e ORACLE_PDB=MYAPP`을 사용합니다. 기본값은 FREEPDB1입니다.

데이터를 영구 보존하려면 `-v oracle-data:/opt/oracle/oradata`를 추가합니다. 컨테이너를 삭제해도 데이터는 보존됩니다.

## 설치 확인

### 컨테이너 상태 확인

Oracle 컨테이너가 정상적으로 실행 중인지 확인합니다:

```bash
docker ps | grep oracle-free
```

STATUS가 "Up"으로 표시되면 컨테이너는 실행 중입니다. 하지만 Oracle 데이터베이스가 완전히 시작되려면 시간이 더 필요합니다.

### 초기화 과정 모니터링

Oracle이 처음 시작할 때는 데이터베이스를 초기화합니다. 이 과정을 실시간으로 확인할 수 있습니다:

```bash
docker logs -f oracle-free
```

로그를 보면 Oracle이 무엇을 하고 있는지 알 수 있습니다. 데이터 파일을 생성하고, 시스템 테이블스페이스를 만들고, PDB를 초기화합니다. 마침내 "DATABASE IS READY TO USE!"라는 메시지가 나타나면 준비가 완료된 것입니다.

첫 실행에는 보통 3-5분이 걸립니다. 두 번째부터는 훨씬 빠르게 시작됩니다.

## 접속 정보 정리

Oracle 컨테이너가 준비되면 다음 정보로 접속할 수 있습니다:

- **호스트**: localhost (같은 컴퓨터에서 접속할 때)
- **포트**: 1521
- **Service Name**: FREEPDB1 (PDB에 접속)
- **SID**: FREE (CDB 전체에 접속, DBA용)
- **사용자**: system 또는 sys
- **비밀번호**: oracle123 (위에서 설정한 값)

JDBC URL 형식으로는 다음과 같이 작성합니다:
```
jdbc:oracle:thin:@localhost:1521/FREEPDB1
```

## 문제 해결

### 포트 충돌 문제

가장 흔한 문제는 1521 포트가 이미 사용 중인 경우입니다. 다음 명령어로 확인할 수 있습니다:

```bash
lsof -i :1521
```

포트가 사용 중이라면 두 가지 선택이 있습니다.

첫 번째는 기존 프로세스를 중지하는 것입니다. 다른 Oracle 컨테이너가 실행 중이라면 `docker stop 컨테이너이름`으로 중지할 수 있습니다.

두 번째는 다른 포트를 사용하는 것입니다. `-p 1522:1521`처럼 호스트 포트를 변경하면 됩니다. 접속할 때는 1522 포트를 사용해야 합니다.

### 메모리 부족 문제

Oracle은 최소 2GB의 메모리를 요구합니다. Docker Desktop의 설정에서 메모리 할당량을 확인하세요. Mac이나 Windows에서는 Docker Desktop 설정에서 조정할 수 있습니다.

### 컨테이너가 계속 재시작되는 문제

`docker logs oracle-free`로 에러 메시지를 확인하세요. 대부분 디스크 공간 부족이나 메모리 부족이 원인입니다.

## 컨테이너 관리

### 중지와 시작

Oracle을 사용하지 않을 때는 컨테이너를 중지하여 리소스를 절약할 수 있습니다:

```bash
docker stop oracle-free
```

다시 사용할 때는 시작하면 됩니다:

```bash
docker start oracle-free
```

### 완전히 제거하기

Oracle 컨테이너가 더 이상 필요 없다면 완전히 제거할 수 있습니다:

```bash
docker stop oracle-free
docker rm oracle-free
```

데이터도 함께 삭제하려면 볼륨도 제거합니다:

```bash
docker volume rm oracle-data
```

## 다음 단계

Oracle이 설치되었으니 이제 접속해볼 차례입니다. [오라클 2단계 컨테이너 접속](oracle-step02-container-access)에서 다양한 도구로 Oracle에 접속하는 방법을 알아보세요.

> [!TIP]
> Docker를 사용하면 Oracle 설치가 이렇게 간단합니다. 전통적인 방법으로는 하루가 걸릴 수도 있는 작업을 단 몇 분만에 완료했습니다. 이것이 컨테이너 기술의 힘입니다.