curl -H "Content-type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZGIyNjU5OWZkYTY2NzFlYWEyNDk2MyIsInJvbGUiOjIsImlhdCI6MTQ5MjE1MzU2NiwiZXhwIjoxNDkyNzU4MzY2fQ.EC1SL2LGjMJTtRWrMIAQUbuvnzCRdxR22vh5CrwJtaI" 'https://analysis.dx168.com/api/v1/trace?query=\{"level":"ERROR","appName":"20170411jujimmd"\}' | python -m json.tool