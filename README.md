
# API Me Cansei

API desenvolvida para servir uma loja virtual de produtos usados.

## Tecnologias utilizadas
* Node 20.8.0
* JavaScript
* Express
* Postgres

## Rodando o projeto localmente

1. Clone o repositório

```bash
  git clone https://github.com/thiago-arend/API-MeCansei.git
```

#

2. Abra o terminal dentro da pasta na qual você clonou o repositório

```bash
  cd API-MeCansei
```

#

3. Instale as dependências

```bash
  npm install
```

#

4. Crie um novo banco de dados com um nome de sua preferência e execute os scripts contidos no arquivo scripts_app_desapego.sql.

#

5. Copie o conteúdo do arquivo .env.example para um novo arquivo .env. Preencha as variáveis de ambiente, conforme o exemplo, atentando-se para utilizar o mesmo nome do banco de dados gerado no passo 4

#
7. Rode o projeto em desenvolvimento

```bash
  npm run dev
```


## Lista de rotas disponíveis

Todas as rotas podem ser testadas usando um API Client da sua preferência através do link de deploy https://me-cansei-api.onrender.com

<details>
<summary>
<b><font color="#D9730D">POST</font></b><font> /participants
</summary>
<br>

* Creates a participant with specified balance
#
* Input:
```typescript
{
	name: string;
	balance: number; // represented in cents (e.g. 1000 cents = $10.00)
}
```
#
* Output: object representing created participant
```typescript
{
	id: number;
	name: string;
	balance: number;
    createdAt: string;
	updatedAt: string;
}
```
#
* Rules
  * Name must be unique, otherwise you'll receive <font color="red">409 (Conflict Error)</font>.
  * Balance must be inputed in cents (e.g. 1000 cents = $10.00).
  * Balance must not be less than $10.00 (1000 cents), otherwise you'll receive <font color="red">400 (Bad Request Error)</font>.
</details>

<details>
<summary> 
<b><font color="#D9730D">POST</font></b><font> /games 
</summary>
<br>

* Creates an open game with score 0x0.
#
* Input:

```typescript
{
	homeTeamName: string;
	awayTeamName: string;
}
```
#
* Output: object representing created game

```typescript
{
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamName: string;
	awayTeamName: string;
	homeTeamScore: number; // initialy 0
	awayTeamScore: number; // initialy 0
	isFinished: boolean; // initialy false
}
```

#
* Rules
  * Team names must be different, otherwise you'll receive <font color="red">400 (Bad Request)</font>.
</details>

<details>
<summary> 
<b><font color="#D9730D">POST</font></b><font> /bets 
</summary>
<br>

* Register a bet from a participant in a specific game. The bet amount is immediately deducted from the participant's balance.
#
* Input:

```typescript
{ 
	homeTeamScore: number;
	awayTeamScore: number; 
	amountBet: number; // represented in cents (e.g. $10.00 = 1000)
	gameId: number; 
	participantId: number;
}
```
#
* Output: object representing created bet

```typescript
{
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamScore: number;
	awayTeamScore: number;
	amountBet: number; // represented in cents (e.g. $10.00 = 1000)
	gameId: number; 
	participantId: number;
	status: string; // may be PENDING, WON or LOST
	amountWon: number || null; // null while bet is PENDING; number if bet has WON or LOST status, with amount won represented in cents
}
```
#
* Rules
  * Game and participant's id must exist, otherwise you'll get <font color="red">404 (Not Found)</font>.
  * Game cannot bet already finished by the time you create a bet, otherwise you'll get <font color="red">403 (Forbidden)</font>.
  * Bet amount must not be greater than participant's balance, otherwise you'll receive <font color="red">403 (Forbidden)</font>.
  * Bet amount must not be lesser than $1.00 (100), otherwise you'll receive <font color="red">403 (Forbidden)</font>.  

</details>

<details>
<summary> 
<b><font color="#D9730D">POST</font></b><font> /games/:id/finish 
</summary>
<br>

* Finishes a game and consequently update all bets linked to it, calculating the amount won in each one and updating the balance of the winning participants.
#
* Input: game final score

```typescript
{
	homeTeamScore: number;
	awayTeamScore: number;
}
```
#
* Output: updated game object

```typescript
{
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamName: string;
	awayTeamName: string;
	homeTeamScore: number;
	awayTeamScore: number;
	isFinished: boolean; // will be set to true
}
```
#
* Rules
  * Game's id must be valid (integer equal or greater to 1), otherwise you'll get <font color="red">400 (Bad Request)</font>.
  * Game's id must exist, otherwise you'll get <font color="red">404 (Not Found)</font>.
  * You must not finish a game that has been already finished, otherwise you'll get <font color="red">403 (Forbidden)</font>.
</details>

<details>
<summary> 
<b><font color="#448375">GET</font></b><font> /participants 
</summary>
<br>

* Returns all participants and their respective balances.
#
* Output: array containing all participants

```typescript
[
	{
		id: number;
		createdAt: string;
		updatedAt: string;
		name: string;
		balance: number; // represented in cents (e.g. $10.00 = 1000)
	}, 
	{...}
]
```
</details>

<details>
<summary> 
<b><font color="#448375">GET</font></b><font> /games 
</summary>
<br>

* Returns all registered games.
#
* Output: array containing all games

```typescript
[
	{
		id: number;
		createdAt: string;
		updatedAt: string;
		homeTeamName: string;
		awayTeamName: string;
		homeTeamScore: number;
		awayTeamScore: number;
		isFinished: boolean;
	},
	{...}
]
```
</details>

<details>
<summary> 
<b><font color="#448375">GET</font></b><font> /games/:id 
</summary>
<br>

* Returns the data for a game along with the bets linked to it.
#
* Output: object representing a game and an array containing all bet linked to it

```typescript
{
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamName: string;
	awayTeamName: string;
	homeTeamScore: number;
	awayTeamScore: number;
	isFinished: boolean;
	bets: {
		id: number;
		createdAt: string;
		updatedAt: string;
		homeTeamScore: number;
		awayTeamScore: number;
		amountBet: number; // represented in cents (e.g. $10.00 = 1000)
		gameId: number; 
		participantId: number;
		status: string; // may be PENDING, WON or LOST
		amountWon: number || null; // null while bet is PENDING; number if bet has WON or LOST status, with amount won represented in cents
	}[]
}
```

#
* Rules
  * Game's id must be valid (integer equal or greater to 1), otherwise you'll get <font color="red">400 (Bad Request)</font>.
  * Game's id must exist, otherwise you'll get <font color="red">404 (Not Found)</font>.
</details>