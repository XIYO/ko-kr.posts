---
title: Oracle Database 개념 가이드
dates:
  - "2025-07-21T15:45:51.000Z"
  - "2025-07-21T15:14:46.000Z"
authors:
  - XIYO
tags:
  - oracle
  - database
  - concepts
  - reference
---

# 오라클 0단계 개념

## Oracle Database가 특별한 이유

Oracle Database는 다른 데이터베이스와 근본적으로 다른 설계 철학을 가지고 있습니다. PostgreSQL이나 MySQL을 알고 있다면, Oracle을 처음 접했을 때 "왜 이렇게 만들었지?"라는 의문이 들 것입니다.

이 문서는 Oracle만의 독특한 개념들이 왜 존재하는지, 어떻게 진화했는지를 설명합니다. 비싼 라이센스 비용 때문에 주로 자금력 있는 대기업이나 과거에 경쟁자가 많지 않았던, 독보적인 시절에 도입된 레거시 시스템에서 주로 사용되지만, 혹시 모르죠. 미래에 내가 사용해야 될지도...

## Oracle만의 독특한 개념 1: User = Schema

대부분의 데이터베이스에서 Schema는 테이블을 그룹화하는 논리적 컨테이너입니다. 그런데 Oracle은 다릅니다.

| 데이터베이스 | 테이블 그룹화 방법 | 실제 명령어 |
|------------|------------------|------------|
| PostgreSQL | Database > Schema > Table | CREATE SCHEMA sales; |
| MySQL | Database = Schema | CREATE DATABASE sales; |
| **Oracle** | **User = Schema** | CREATE USER sales IDENTIFIED BY...; |

Oracle의 설계 철학은 단순했습니다. "각 사용자가 자신만의 테이블 공간을 가지면 되지 않나?"라는 접근이었습니다.

결과적으로 sales라는 사용자를 만들면 sales 스키마가 자동 생성되고, hr이라는 사용자를 만들면 hr 스키마가 자동 생성됩니다. **한 사용자는 정확히 하나의 스키마만 소유합니다**.

> [!WARNING]
> Oracle의 CREATE SCHEMA 명령어는 다른 DB와 다릅니다!
> 스키마를 생성하는 것이 아니라, 한 트랜잭션 내에서 여러 테이블을 한번에 생성하는 명령어입니다.
> PostgreSQL의 CREATE SCHEMA와는 완전히 다른 기능을 수행합니다.

## Oracle만의 독특한 개념 2: 멀티테넌트 아키텍처

Oracle은 12c에서 "멀티테넌트"라는 새로운 아키텍처를 도입했습니다. 흥미롭게도 PostgreSQL과 MySQL은 처음부터 하나의 인스턴스에서 여러 데이터베이스를 관리할 수 있었습니다.

Oracle이 늦은 이유는 아키텍처 차이 때문입니다:

**다른 DB**: Instance → 여러 Database → 여러 Schema
**Oracle 11g까지**: Instance = Database (1:1 관계)

Oracle은 이 구조적 차이를 해결하기 위해 CDB/PDB 구조를 도입하고, 이를 "멀티테넌트"라고 명명했습니다:
- **CDB (Container Database)**: 전체를 감싸는 컨테이너
- **PDB (Pluggable Database)**: 독립적으로 관리되는 개별 데이터베이스

이제야 다른 DB처럼 하나의 인스턴스에서 여러 데이터베이스를 관리할 수 있게 된 것입니다.

## 파일 구조로 이해하는 Oracle의 진화

데이터베이스의 본질은 결국 파일입니다. Oracle의 진화를 파일 관점에서 보면 왜 이런 개념들이 생겨났는지 이해할 수 있습니다.

### Oracle 11g 이전: 하나의 거대한 파일 덩어리

초기 Oracle은 모든 데이터를 하나의 파일 세트에 저장했습니다. /oradata/ORCL/ 디렉토리에는 system01.dbf(시스템 정보), users01.dbf(사용자 데이터), temp01.dbf(임시 데이터) 등의 파일이 있었습니다.

모든 사용자의 데이터가 이 파일들에 뒤섞여 저장됩니다. User1의 테이블도, User2의 테이블도 모두 같은 users01.dbf 파일 안에 있습니다.

**문제 상황**: "User1의 데이터만 다른 서버로 옮겨주세요"

이게 얼마나 고통스러운 작업인지 상상해보세요. 거대한 파일을 열어서 User1의 테이블들을 하나하나 찾아내고, 데이터를 추출(Export)한 다음 새 서버에서 다시 생성(Import)해야 합니다.

마치 여러 사람의 물건이 뒤섞인 창고에서 특정 사람의 물건만 골라내는 것과 같습니다.

### Oracle 12c 이후: 독립된 파일로 분리

Oracle도 결국 깨달았습니다. "파일을 분리하면 되잖아?"

CDB/PDB 구조에서는 /oradata/CDB/PDB1/users01.dbf(PDB1 전용)와 /oradata/CDB/PDB2/users01.dbf(PDB2 전용)로 분리되었습니다.

각 PDB가 자신만의 파일을 가집니다. 이제 데이터 이전이 간단해졌습니다.

**문제 상황**: "PDB1을 다른 서버로 옮겨주세요"

PDB1 폴더를 통째로 복사하고, 새 서버에 붙여넣은 다음 메타데이터를 등록하면 됩니다.

파일이 물리적으로 분리되어 있으니 복사-붙여넣기가 가능해진 것입니다.

> [!INFO]
> **테이블스페이스의 정체**
> 
> .dbf 파일을 Oracle은 "테이블스페이스"라고 부릅니다. 이는 데이터 파일을 논리적으로 관리하는 Oracle의 방식입니다.
> - system.dbf → SYSTEM 테이블스페이스
> - users.dbf → USERS 테이블스페이스
> 
> 다른 DB는 단순히 "데이터 파일"이라고 부르는 반면, Oracle은 고유한 관리 체계를 반영하여 "테이블스페이스"라는 용어를 사용합니다.

## SID에서 Service Name으로: 접속 방식의 진화

파일 구조가 바뀌면서 데이터베이스를 찾는 방법도 진화해야 했습니다.

### 1단계: SID - 단순했던 시절 (Oracle 8 이전)

초기에는 간단했습니다. 하나의 인스턴스가 하나의 데이터베이스 파일 세트를 관리했고, 이를 식별하는 이름이 **SID(System Identifier)**였습니다.

- ORCL이라는 SID = /oradata/ORCL/ 디렉토리
- XE라는 SID = /oradata/XE/ 디렉토리

접속할 때도 단순히 "ORCL에 연결해줘"라고 하면 끝이었습니다.

### 2단계: Service Name 도입 - 통계와 관리의 필요성 (Oracle 8i)

기업이 성장하면서 문제가 생겼습니다. 하나의 데이터베이스(ORCL)에 수백 명이 접속하는데, 모두가 "ORCL"로만 보입니다.

**실제 상황**:
- 영업팀 100명이 ORCL에 접속
- 인사팀 50명이 ORCL에 접속  
- 야간 배치 작업이 ORCL에 접속
- 데이터베이스가 느려지면? 누구 때문인지 알 수 없음

Oracle의 해결책은 **Service Name**이라는 별명 시스템이었습니다. 영업팀은 SALES_SVC라는 이름으로, 인사팀은 HR_SVC라는 이름으로, 배치 프로세스는 BATCH_SVC라는 이름으로 접속하도록 했습니다.

실제로는 모두 같은 ORCL 데이터베이스에 접속하지만, 이제 "SALES_SVC가 리소스의 80%를 사용 중"같은 통계를 볼 수 있게 되었습니다.

### 3단계: Service Name의 진짜 의미 - 독립된 데이터베이스 (Oracle 12c)

CDB/PDB 구조가 도입되면서 Service Name의 의미가 완전히 바뀌었습니다.

**이전 (11g까지)**:
- 하나의 데이터베이스에 여러 Service Name
- 모두 같은 곳을 가리키는 별명들

**이후 (12c부터)**:
- CDB 안에 여러 개의 독립된 PDB
- 각 PDB가 고유한 Service Name을 가짐
- FREEPDB1 = 실제로 독립된 데이터베이스
- MYPDB = 또 다른 독립된 데이터베이스

Service Name이 단순한 별명에서 실제 데이터베이스를 가리키는 주소가 된 것입니다.

> [!TIP]
> **현재 Oracle 접속 방식**
> - SID 접속: CDB 전체에 접근 (주로 DBA용)
> - Service Name 접속: 특정 PDB에 접근 (일반 사용자용)
> 
> 새로운 프로젝트라면 무조건 Service Name을 사용하세요.
## 버전과 에디션: 시간과 돈의 차이

### 버전 = 시간의 흐름

Oracle 버전은 시대를 반영합니다. 8i와 9i의 'i'는 internet을 의미하며 닷컴 버블 시대를, 10g와 11g의 'g'는 grid를 의미하며 분산 컴퓨팅 시대를, 12c 이후의 'c'는 cloud를 의미하며 클라우드 시대를 나타냅니다.

주요 변곡점은 8i(1999년)에 Service Name이 도입되었고, 12c(2013년)에 CDB/PDB 구조가 도입되었으며, 23c(2023년)에 드디어 쓸만한 무료 버전이 출시되었다는 점입니다.

### 에디션 = 지갑의 두께

같은 23c 버전이라도 얼마를 내느냐에 따라 다릅니다.

무료 에디션으로는 오래된 Express Edition(XE)과 최신 Free Edition(23c)이 있으며, XE는 제약이 많고 Free Edition이 XE를 대체하기 위해 출시되었습니다.

유료 에디션으로는 중소기업용 Standard Edition 2와 대기업용 Enterprise Edition이 있으며, Enterprise Edition은 모든 기능을 사용할 수 있지만 매우 비쌉니다.

> [!WARNING]
> Oracle Enterprise Edition은 CPU 코어당 라이센스를 책정합니다.
> 8코어 서버라면 수억원의 라이센스 비용이 발생할 수 있습니다.
> 그래서 많은 기업이 PostgreSQL이나 MySQL로 이전합니다.

## 다음 단계

[오라클 1단계 도커 설치](oracle-step01-docker-installation)