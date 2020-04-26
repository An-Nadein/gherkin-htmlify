var source = {};
source.project = 'My Meaningful Title';
source.features = [
	{
		"path": "/AccountRecognition",
		"name": "Atm recognizes accounts",
		"description": "",
		"meta": [],
		"tests": [
			{
				"steps": [
					{
						"text": "Given no existing Accounts",
						"table": []
					},
					{
						"text": "When a user uses card '1111'",
						"table": []
					},
					{
						"text": "Then ATM shows error 'No Account'",
						"table": []
					}
				],
				"exampleBlocks": [],
				"name": "Show error when no Account",
				"meta": [],
				"documentation": "",
				"content": "Given no existing Accounts\r\n    When a user uses card '1111'\r\n    Then ATM shows error 'No Account'"
			},
			{
				"steps": [
					{
						"text": "Given account for card '1111' with balance of 200 PLN",
						"table": []
					},
					{
						"text": "When a user withdraws 100 PLN with card '1111'",
						"table": []
					},
					{
						"text": "Then user gets banknotes (100) PLN",
						"table": []
					}
				],
				"exampleBlocks": [],
				"name": "Withdraw succesfully when account exists",
				"meta": [],
				"documentation": "",
				"content": "Given account for card '1111' with balance of 200 PLN\r\n    When a user withdraws 100 PLN with card '1111'\r\n    Then user gets banknotes (100) PLN"
			}
		]
	},
	{
		"path": "/DispensingBankotes",
		"name": "Banknotes are dispensed in a smart way",
		"description": "",
		"meta": [],
		"tests": [
			{
				"steps": [
					{
						"text": "Given Atm has banknotes:",
						"table": [
							[
								"value",
								"count"
							],
							[
								"$100",
								"1"
							]
						]
					},
					{
						"text": "When $100 is to be dispensed",
						"table": []
					},
					{
						"text": "Then following banknotes are dispensed:",
						"table": [
							[
								"value",
								"count"
							],
							[
								"$100",
								"1"
							]
						]
					}
				],
				"exampleBlocks": [],
				"name": "Single banknote matches amount",
				"meta": [],
				"documentation": "",
				"content": "Given Atm has banknotes:\r\n\t\t\t| value | count |\r\n\t\t\t| $100  |     1 |\r\n\t\tWhen $100 is to be dispensed\r\n\t\tThen following banknotes are dispensed:\r\n\t\t\t| value | count |\r\n\t\t\t| $100  |     1 |"
			},
			{
				"steps": [
					{
						"text": "Given Atm has banknotes:",
						"table": [
							[
								"value",
								"count"
							],
							[
								"$50",
								"2"
							]
						]
					},
					{
						"text": "When $100 is to be dispensed",
						"table": []
					},
					{
						"text": "Then following banknotes are dispensed:",
						"table": [
							[
								"value",
								"count"
							],
							[
								"$50",
								"2"
							]
						]
					}
				],
				"exampleBlocks": [],
				"name": "Two banknotes match amount",
				"meta": [],
				"documentation": "",
				"content": "Given Atm has banknotes:\r\n\t\t\t| value | count |\r\n\t\t\t| $50   |     2 |\r\n\t\tWhen $100 is to be dispensed\r\n\t\tThen following banknotes are dispensed:\r\n\t\t\t| value | count |\r\n\t\t\t| $50   |     2 |"
			}
		]
	},
	{
		"path": "/PinRecognition",
		"name": "Atm recognizes pin",
		"description": "",
		"meta": [],
		"tests": [
			{
				"steps": [
					{
						"text": "Given a card with pin '1234'",
						"table": []
					},
					{
						"text": "When a user enters pin '9999'",
						"table": []
					},
					{
						"text": "Then ATM shows error 'Invalid pin'",
						"table": []
					}
				],
				"exampleBlocks": [],
				"name": "Show error when invalid pin",
				"meta": [],
				"documentation": "",
				"content": "Given a card with pin '1234'\r\n    When a user enters pin '9999'\r\n    Then ATM shows error 'Invalid pin'"
			},
			{
				"steps": [
					{
						"text": "Given a card with pin '1234'",
						"table": []
					},
					{
						"text": "When a user enters pin '1234'",
						"table": []
					},
					{
						"text": "Then can withdraw",
						"table": []
					}
				],
				"exampleBlocks": [],
				"name": "Withdraws money with valid",
				"meta": [],
				"documentation": "",
				"content": "Given a card with pin '1234'\r\n    When a user enters pin '1234'\r\n    Then can withdraw"
			}
		]
	}
];
source.date = '2020:04:26:12:53:32';
