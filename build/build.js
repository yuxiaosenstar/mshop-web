const { execSync } = require("child_process");
const dockerImageName = "yuxiaosen/mshop-web";

execSync(`npm run build && docker buildx build \
--platform linux/amd64,linux/arm64 \
--push -t ${dockerImageName} .
`);
