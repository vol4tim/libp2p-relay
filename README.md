# Libp2p relay

## Installation and Running

### 1. Cloning the repository
```bash
git clone https://github.com/vol4tim/libp2p-relay.git
cd libp2p-relay
```

### 2. Installing dependencies
```bash
npm i
```

### 3. Configuration setup
In the `config/` directory, there is a configuration file template:
`config/config.template.json`
Copy it to create your own config:
```bash
cp config/config.template.json config/config.json
```
Open `config/config.json` and fill in the required parameters.

### 4. Generating the private key
The private key, which needs to be specified in the configuration file later, is generated using the following command:
```bash
npm run start:generate
```
After running the command, copy the generated key and paste it into the corresponding field in `config/config.json`.

### 5. Starting the service
To run the application, use:
```bash
npm run start
```
