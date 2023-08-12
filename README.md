# Strategy Sentinel

[Generally Genius](https://corsaircoalition.github.io/) (GG) is a modular generals.io bot framework for development and analysis of game strategies and actions. [CorsairCoalition](https://corsaircoalition.github.io/) is a collection of components that form the GG framework.


Strategy Sentinel receives action recommendations from [Armada Assault](https://github.com/CorsairCoalition/ArmadaAssault), and in an ideal situation, selects the best sequence of actions based on the current state of the game, and relays those to the [Sergeant Socket](https://github.com/CorsairCoalition/SergeantSocket) to send to the game server. In the current implementation, it relays **all** recommended actions to the game server, which makes the bot very erratic. Correct implementation of the strategy module is left as an exercise for the reader.

## Configuration

Download `config.example.json` from the [documentation repository](https://github.com/CorsairCoalition/docs) and make desired changes.

To setup other components, see the [detailed instructions](https://corsaircoalition.github.io/setup/) on the [project website](https://corsaircoalition.github.io/).

## Execution

Install and run the executable:

```sh
npm install -g @corsaircoalition/strategy-sentinel
strategy-sentinel config.json
```

or run directly from npm library:

```sh
npx @corsaircoalition/strategy-sentinel config.json
```

or use docker:

```sh
docker run -it -v ./config.json:/config.json ghcr.io/corsaircoalition/strategysentinel:latest
```

## Usage

```
Usage: @corsaircoalition/strategy-sentinel [options] <configFile>

bot component that analyzes game state and selects actions

Options:
  -V, --version  output the version number
  -d, --debug    enable debugging (default: false)
  -h, --help     display help for command
```
