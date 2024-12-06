let p = palavras;
let count = 0;
let letras = ['a','e','i','d','p','g','o'];
let rArea = document.querySelector('.right-area');
let str = document.querySelector('.word-area input');
let tWords = document.querySelector('.total-words');
let cNumber = document.querySelector('.current-number');
let m = document.querySelector('.msg p');

//funcao para adicionar o quantidade de campos necessários de forma automatica
function addFields() {
	for(let i = 0; i < p.length; i++){
		let l = document.createElement('div');
		let inp = document.createElement('input');
		l.classList.add('list');
		rArea.appendChild(l);

		//insere o numero de letras de cada palavra na sua respectiva posicao
		inp.placeholder = `${p[i].length} Letras`;
		inp.readOnly = true;
		inp.setAttribute('data-position', i);
		l.appendChild(inp);
	}

	//informa o total de palavras da lista
	tWords.innerHTML = p.length;
	updateQtd(count);
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
		showMsg('Palavra não tem a letra central');
	}
}

function verifyInvalidLetters(string) {
	//transforma a palavra digitada em array
	string = string.split('');

	//verifica se palavra possui letras invalidas
	string.forEach((item)=>{
		let aux = 0;
		for(let i = 0; i<letras.length; i++){
			if (item == letras[i]) {
				aux++;
				return;
			}

			if (i == (letras.length - 1) && aux == 0) {
				showMsg('Palavra contém letras inválidas');
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
		rList.forEach((item)=>{
			if (item.getAttribute('data-position') == list) {
				if (item.value == '') {
					item.classList.add('correct');
					item.value = string;
					count++;
					updateQtd(count);
					return;
				}else{
					showMsg('Palavra já encontrada');
				}
			}
		});
	}else{
		showMsg('Palavra não está na lista');
	}
}

function updateQtd(n) {
	cNumber.innerHTML = n;
}

function showMsg(msg) {
	m.innerHTML = msg;
	console.log(msg);
	m.style.display = 'block';
	setTimeout(()=>{
		m.style.display = 'none';
		m.innerHTML = '';
	}, 2000);
}

str.addEventListener('keyup', (e)=>{
	if (e.key === 'Enter') {
		let newStr = str.value;
		str.value = '';

		//verifica se palavra tem o minimo de letras possivel
		if (newStr.length <= 3) {
			showMsg('Palavra não possui número mínimo de letras');
		}else{
			verifyCentralLetter(newStr);
			verifyInvalidLetters(newStr);
			verifyWordsList(newStr);
		}
	}
});