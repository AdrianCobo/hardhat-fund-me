Set up:
yarn add --dev hardhat
yarn hardhat //despues selecciona el avanzado en este ejemplo se han borrado alfunos ficheros
yarn solhint contracts/\*.sol //indicamos que queremos que solhint (analiza el codigo en busca de errores) analize esos ficheros
configurar .pretierrc
configurar .prettierignore
mirar que en hardat.config.js esta bien puesta la version del compilador
yarn add --dev @chainlink/contracts //añadimos los contratos de link
yarn add --dev hardhat-deploy//añadimos el paquete de hardhat que despliega los contratos y añadimos el require en hadhat.config.js
borramos el scritp deploy.js ya que ahora vamos a tener disponible la tarea deploy
creamos una carpeta llamada deploy donde van a ir nuestros scripts de deploy
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
creamos el fichero 01-deploy-fund-me.js