---
title: Oracle 컨테이너 접속 가이드
dates:
  - "2025-07-21T15:45:51.000Z"
  - "2025-07-21T15:14:46.000Z"
authors:
  - XIYO
tags:
  - docker
  - oracle
  - database
  - guide
  - connection
  - troubleshooting
---

# Oracle 컨테이너 접속 가이드

## IntelliJ Ultimate DataGrip 접속 설정

### DataGrip으로 Oracle 접속

1. DataGrip을 실행하고 새 데이터소스 추가 (+)
2. Oracle 선택
3. 다음 설정값 입력:

**기본 설정:**
- Host: `localhost`
- Port: `1521`
- SID: `FREE`
- User: `system`
- Password: `oracle123`

**Service Name 사용 시:**
- Connection type: `Service name`
- Service name: `FREEPDB1`

**고급 설정:**
- Driver: Oracle JDBC Driver 자동 다운로드
- URL: `jdbc:oracle:thin:@localhost:1521/FREEPDB1`

4. "Test Connection" 클릭하여 연결 확인
5. "OK" 클릭하여 저장

## 문제 해결

### Connection refused / IO Error

**증상:** DataGrip에서 Oracle 에러(ORA-)가 아닌 연결 자체가 실패하는 경우

**발생 원인:** Docker나 컨테이너 문제로 Oracle 서버에 접근조차 못하는 상태

**해결 방법:**

1. Docker Desktop이 실행 중인지 확인:
```bash
docker version
```
Docker가 실행되지 않으면 Docker Desktop을 시작하세요.

2. Oracle 컨테이너 상태 확인:
```bash
docker ps -a | grep oracle-free
```

3. 컨테이너 상태별 조치:
   - **컨테이너가 없는 경우**: 새로 생성 (아래 "컨테이너가 없거나 중지된 경우" 참조)
   - **STATUS: Exited**: `docker start oracle-free` 실행 후 5분 대기
   - **STATUS: Up**: 포트 매핑 확인

4. 포트 매핑 확인:
```bash
docker port oracle-free
```
출력이 `1521/tcp -> 0.0.0.0:1521`이 아니면 컨테이너를 재생성하세요.

### Network adapter could not establish the connection

**증상:** DataGrip에서 네트워크 연결을 시도하지만 실패

**발생 원인:** 방화벽, 잘못된 호스트/포트 설정, 또는 Oracle 리스너 미작동

**해결 방법:**

1. localhost 대신 127.0.0.1 사용:
   - Host: `127.0.0.1` (localhost 대신)
   - Port: `1521`

2. Oracle 리스너 상태 확인:
```bash
docker exec oracle-free lsnrctl status
```
리스너가 작동하지 않으면 위의 "ORA-12541" 해결 방법 참조

3. 다른 포트 사용 시 설정 확인:
```bash
docker ps | grep oracle-free
```
PORTS 열에서 실제 포트 매핑 확인 (예: 1522->1521)

### ORA-01017: invalid username/password (사용자명/패스워드가 올바르지 않음)

**발생 원인:** 입력한 패스워드가 실제 데이터베이스에 설정된 패스워드와 다를 때 발생합니다.

**해결 방법:** 패스워드가 기억나지 않을 때는 아래 명령으로 재설정하세요:

SYSTEM과 SYS 계정의 패스워드 재설정:
```bash
docker exec -it oracle-free sqlplus / as sysdba -c "ALTER USER system IDENTIFIED BY oracle123; ALTER USER sys IDENTIFIED BY oracle123;"
```

특정 사용자 계정의 패스워드 재설정 방법:

형식: `ALTER USER 사용자명 IDENTIFIED BY 새패스워드;`

예시 1 - myapp 사용자의 패스워드를 myapp123으로 변경:
```bash
docker exec -it oracle-free sqlplus / as sysdba -c "ALTER USER myapp IDENTIFIED BY myapp123;"
```

예시 2 - scott 사용자의 패스워드를 tiger로 변경:
```bash
docker exec -it oracle-free sqlplus / as sysdba -c "ALTER USER scott IDENTIFIED BY tiger;"
```

### ORA-12541: TNS:no listener (리스너가 응답하지 않음)

**발생 원인:** Oracle 리스너 서비스가 중지되었거나 응답하지 않을 때 발생합니다.

**해결 방법:** 리스너를 재시작하세요:

```bash
docker exec -it oracle-free bash -c "lsnrctl stop && lsnrctl start"
```

### 컨테이너가 없거나 중지된 경우

**발생 원인:** Docker 컨테이너가 존재하지 않거나 중지된 상태입니다.

**해결 방법:** 먼저 컨테이너 상태를 확인하고 적절한 조치를 취하세요:

컨테이너 상태 확인:
```bash
docker ps -a | grep oracle-free
```

컨테이너가 중지된 경우 (STATUS: Exited):
```bash
docker start oracle-free
```

컨테이너가 없는 경우 새로 생성:
```bash
docker run -d --name oracle-free -p 1521:1521 -p 5500:5500 -e ORACLE_PWD=oracle123 container-registry.oracle.com/database/free:latest
```

### 컨테이너 재시작 후 접속 불가

**발생 원인:** Oracle 컨테이너가 재시작되면 데이터베이스가 자동으로 시작되지 않을 수 있습니다.

**해결 방법:** 데이터베이스가 준비될 때까지 기다리거나 수동으로 시작하세요:

로그 확인 (준비 완료 메시지 확인):
```bash
docker logs oracle-free | grep "DATABASE IS READY"
```

수동으로 데이터베이스 시작:
```bash
docker exec -it oracle-free bash -c "echo 'STARTUP;' | sqlplus / as sysdba"
```

