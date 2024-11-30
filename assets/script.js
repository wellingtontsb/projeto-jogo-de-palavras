let p = palavras;
let rArea = document.querySelector(".right-area");


//funcao para adicionar o quantidade de campos necessários de forma automatica
function addFields() {
	for(let i = 0; i < p.length; i++){
		let l = document.createElement('div');
		l.classList.add('list');
		rArea.appendChild(l);
		let inp = document.createElement('input');

		//insere o numero de letras que cada palavra na sua respectiva posicao
		inp.placeholder = `${p[i].length} Letras`;
		inp.readOnly = true;
		l.appendChild(inp);
	}	
}

addFields();