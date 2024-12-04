let p = palavras;
let rArea = document.querySelector('.right-area');
let str = document.querySelector('.word-area input');
let letras = ['a','e','i','d','p','g','o'];


//funcao para adicionar o quantidade de campos necessários de forma automatica
function addFields() {
	for(let i = 0; i < p.length; i++){
		let l = document.createElement('div');
		let inp = document.createElement('input');
		l.classList.add('list');
		rArea.appendChild(l);

		//insere o numero de letras que cada palavra na sua respectiva posicao
		inp.placeholder = `${p[i].length} Letras`;
		inp.readOnly = true;
		inp.setAttribute('data-position', i);
		l.appendChild(inp);
	}	
}
addFields();
let rList = document.querySelectorAll('.list input');

function verifyCentralLetter(string){
	//transforma a palavra digitada em array
	string = string.split('');

	//verifica se palavra possui a letra obrigatoria
	let resp = string.find((value)=>{
		if (value == 'o' || value == 'O') {
			return true;
		}
	});
	if (!resp) {
		console.log('Palavra não tem a letra central');
	}
}

function verifyInvalidLetters(string) {
	//transforma a palavra digitada em array
	string = string.split('');

	//verifica se palavra possui letras invalidas
	string.forEach((item)=>{
		let count = 0;
		for(let i = 0; i<letras.length; i++){
			console.log(item, letras[i]);
			if (item == letras[i]) {
				count++;
				return;
			}

			if (i == (letras.length - 1) && count == 0) {
				console.log('Palavra contém letras inválidas');
				return false;
			}
		}
	});
}

function verifyWordsList(string) {
	//verifica se palavra esta na listagem
	let list = palavras.findIndex((item)=>{
		if (item == string) {
			return true;
		}
	});

	//adiona a palavra na sua posicao na lista caso verdade
	if (list >= 0) {
		console.log('Palavra está na lista');

		rList.forEach((item)=>{
			if (item.getAttribute('data-position') == list) {
				item.classList.add('correct');
				item.value = string;
				return;
			}
			console.log('entrou');
		});

	}else{
		console.log('Palavra não está na lista');
	}
}

str.addEventListener('keyup', (e)=>{

	if (e.key === 'Enter') {
		let newStr = str.value;
		str.value = '';

		//verifica se palavra tem o minimo de letras possivel
		if (newStr.length <= 3) {
			console.log('Palavra não possui número mínimo de letras');
		}else{
			verifyCentralLetter(newStr);
			verifyInvalidLetters(newStr);
			verifyWordsList(newStr);
		}
	}
});