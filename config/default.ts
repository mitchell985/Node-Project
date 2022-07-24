export default {
    port: 3000,
    dbUri: "mongodb://localhost:27017/rest-api",
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    publicKey: `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHPyaZS8bdEvYpTe09YlTGxq1kYf
L1Bw2R0PocQSRUDsee69zxf29eLLtak0USgumJ8SqPO5Gn9i2kYgiT8+qb4Y4jNu
U53s1dp5cZmNK3nAmG+S15QCBFwMAat1nsfRNa+eUf5ZfZS/N375sy/75UZK9024
K4DJIxYruaZ4pLBXAgMBAAE=
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHPyaZS8bdEvYpTe09YlTGxq1kYfL1Bw2R0PocQSRUDsee69zxf2
9eLLtak0USgumJ8SqPO5Gn9i2kYgiT8+qb4Y4jNuU53s1dp5cZmNK3nAmG+S15QC
BFwMAat1nsfRNa+eUf5ZfZS/N375sy/75UZK9024K4DJIxYruaZ4pLBXAgMBAAEC
gYApmGKGKF8hN2WfUJ0gavsSvfUm7NMVgZZyFYSMCZ3sn6lSm6dqyn8FoN0H2avv
xV+dWZ1g6hv2bSkvFUcHeFx+R3gcPT4dsrWUOmnCX3oMtQnEk4oWy7esbAWwgJV0
JBwkjFK19aNiiQmbaAXjLHy5z1Bc6qwYRogtuosHt9KmGQJBAM1xxml2uDFoyoWH
DmCKT+W0iTt70O1/bxywqXvNrPl9hQeKO1wC8WhtlDYc4EgkUpczUPy1TsQaKzPL
2/j/04UCQQCQeqGu1C0kFV3qKQNvev9KdbC71Jlj3qJwWuZQ51ea+CEW0MvLj/S0
TwY9YgiNcCfph/0tpkTOchvnjh8i/VUrAkBhMat5p5XaokX1yABQQf8soC2we5JL
WdeaTiXQkWx9GBoAiDAvBqFpEzZkJ2MgHjcIm1l8RNZ/xhWcSpzF/1n1AkB2Na/V
8EnizQyjCt2Bt9vqmzJ36/F4se6sCOOKbE3UQJIqLbmgmu73G/UaAfzHZG1zeE1g
rTp8wwYrxa+aHDYzAkEAjwletx/6sWEqvT+jyN6taOTnTBy9AsJo6qSfo488TlxL
dqGDIqToUXognf05JEocZMjx59kJxVs9/RncbtnZIA==
-----END RSA PRIVATE KEY-----`
}