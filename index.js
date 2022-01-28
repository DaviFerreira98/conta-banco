// modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// modulos internos
const fs = require('fs')

operation()

function operation(){

    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Qual a operação que deseja realizar',
        choices: [
            'Criar conta',
            'Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    },
])
    .then((resposta) => {
        const action = resposta['action']
        if(action=== 'Criar conta'){
            criarConta()
        }
    })
    .catch((err)=> console.log(err))

}

//Ciação de conta

function criarConta(){
    console.log(chalk.bgGreen.black("Muito Bem-vindo a familia BGStart nosso Banco!"))
    console.log(chalk.green('Escolha as opções da sua conta'))
    construirConta()
}

function construirConta(){

    inquirer.prompt([{
        name: 'nomeConta',
        message: ' Digite seu nome:'
        }
    ]).then(resposta =>{
        const nomeConta = resposta['nomeConta']
        console.info(nomeConta)
        if(!fs.existsSync('contas')){
            fs.mkdirSync('contas')
        }
        if (fs.existsSync(`contas/${nomeConta}.json`)){
            console.log(chalk.bgRed.black('Esta conta ja existe'),)
            construirConta()
            return
        }
        fs.writeFileSync(`contas/${nomeConta}.json`, '{"balance: 0"}', function(err){
            console.log(err)
        },
        )
        console.log(chalk.green('Conta criada com sucesso'))
        operation()
    }).catch(err => console.log(err))
}