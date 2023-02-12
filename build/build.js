const { exec } = require("child_process");
const dockerImageName = "yuxiaosen/mshop-web";

exec(`docker buildx build \
--platform linux/amd64,linux/arm64 \
--push -t ${dockerImageName} .
`);
