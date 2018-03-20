var jogo = {};
var fase = 1;
var vidas = 10;
var pontos = 0;
var acertos = 0;
var podeClicar = false;
var aviso = false;
var verif1 = false;
var verif2 = false;
var alfake = 0;
var track1 = 0; var track2 = 0;
var colisao = false;

jogo.timer = setInterval(loop, 20);

function loop(){
    atualizaFase();
	reposicionar();
	placar();
	
	if (vidas <= 0){
		$("#flecha").remove(); $("#alvo").remove(); $("#placar").remove();
		window.clearInterval(jogo.timer);
		jogo.timer = null;
		$("#fundo").click(function(){
			location.reload();
		});
		var saida = "<h3> Game Over </h3><h4>Pontuação Final: " + pontos + "</h4>" + "<div id=reiniciar onClick=reiniciar()><h5>REINICIAR</h5></div>";
		document.getElementById("gameover").innerHTML = saida;
	}

	if(track1 > vidas){
		document.getElementById("fundo").style.pointerEvents = "auto";
	} else if(track2 < pontos){
		document.getElementById("fundo").style.pointerEvents = "auto";
	}
}

function atualizaFase(){
	if (fase >= 2){
		var moveAlvo = parseInt($("#alvo").css("top"));
		$("#alvo").css("top", moveAlvo + fase);
		if (moveAlvo >= 300){
			verif1 = true;
			verif2 = false;
		}
		if (moveAlvo <= 0){
			verif2 = true;
			verif1 = false;
		}
		if (verif1){
			$("#alvo").css("top", moveAlvo - fase);
		} 
		if (verif2){
			$("#alvo").css("top", moveAlvo + fase);
		}
		if (fase >= 6){
			$("#alvo").css("top", moveAlvo);
		}
	} 
}

var rand = window.setInterval(randAlvo, 1500);
function randAlvo(){
    if(fase >= 6){
		var random = parseInt(Math.random() * 300);
		$("#alvo").css("top", random);
	}
	if(fase >= 10){
		window.clearInterval(rand);
		rand = NULL;
	}
}
var rand3 = window.setInterval(randAlvo1, 1000);
function randAlvo1(){
    if(fase >= 10){
		var random = parseInt(Math.random() * 300);
		$("#alvo").css("top", random);
	}
	if(fase >= 15){
		window.clearInterval(rand3);
		rand3 = NULL;
	}
}
var rand4 = window.setInterval(randAlvo2, 500);
function randAlvo2(){
    if(fase >= 15){
		var random = parseInt(Math.random() * 300);
		$("#alvo").css("top", random);
	}
}
		
function segueMouse(event){
	var xMOUSE = event.clientX;
	var yMOUSE = event.clientY;
	var element = document.getElementById("flecha");
	var xFLECHA = Math.round(element.getBoundingClientRect().left);
	var yFLECHA = Math.round(element.getBoundingClientRect().top);
	
	var CX = xMOUSE - xFLECHA;
	var CY = yMOUSE - yFLECHA;
	var H = Math.sqrt(Math.pow(CX, 2) + Math.pow(CY, 2));
	var alfa_r = Math.asin(CY/H);
	var alfa = Math.round(alfa_r * (180/3.14));
	
	var cosseno = Math.cos(alfa_r) * 36;
	var xFLECHA_v2 = Math.round(element.getBoundingClientRect().left + cosseno);
	if (alfa >= 0){
		var seno = Math.sin(alfa_r) * 36;
	}
	else{
		var seno = Math.sin(alfa_r) * -36;
	}
	var yFLECHA_v2 = Math.round(element.getBoundingClientRect().top + seno);
	
	var CX2 = xMOUSE - xFLECHA_v2;
	var CY2 = yMOUSE - yFLECHA_v2;
	var H2 = Math.sqrt(Math.pow(CX2, 2) + Math.pow(CY2, 2));
	var alfa_r2 = Math.asin(CY2/H2);
	var alfa2 = Math.round(alfa_r2 * (180/3.14));

	$("#fundo").click(function(){
		document.getElementById("fundo").style.pointerEvents = "none";
	});
	
	document.getElementById("flecha").style.transform = "scale(0.5) rotate(" + alfa + "deg)";
}

function fisicaCalculo(event){
	var xMOUSE = event.clientX;
	var yMOUSE = event.clientY;
	var element = document.getElementById("flecha");
	var xFLECHA = Math.round(element.getBoundingClientRect().left);
	var yFLECHA = Math.round(element.getBoundingClientRect().top);
	
	var CX = xMOUSE - xFLECHA;
	var CY = yMOUSE - yFLECHA;
	var H = Math.sqrt(Math.pow(CX, 2) + Math.pow(CY, 2));
	var alfa_r = Math.asin(CY/H);
	var alfa = Math.round(alfa_r * (180/3.14));
	
	var cosseno = Math.cos(alfa_r) * 36;
	var xFLECHA_v2 = Math.round(element.getBoundingClientRect().left + cosseno);
	if (alfa >= 0){
		var seno = Math.sin(alfa_r) * 36;
	}
	else{
		var seno = Math.sin(alfa_r) * -36;
	}
	var yFLECHA_v2 = Math.round(element.getBoundingClientRect().top + seno);
	
	var element2 = document.getElementById("alvo");
    var xALVO = element2.getBoundingClientRect().left;	
    var dX = xALVO - (xFLECHA_v2 + 70);
	var mX = (dX/50);
	var dY = Math.tan(alfa_r) * dX;
	var mY = (dY/50);

	if(vidas <=  0){
		alfa = 0;
		mX = 0; mY = 0;
		$("#flecha").css("left", -40);
		$("#flecha").css("top", 200);
	}

	track1 = vidas; track2 = pontos;
	podeClicar = true;
	
	var rep = window.setInterval(move, 20);
	function move(){
		var moveX = parseInt($("#flecha").css("left"));
		$("#flecha").css("left", moveX + mX);
		var moveY = parseInt($("#flecha").css("top"));
		$("#flecha").css("top", moveY + mY);
		var colisao1 = ($("#flecha").collision($("#alvo")));
		if (colisao1.length > 0){
			colisao = true;
		}
		if (aviso == true){
			if (colisao == true){
				$("#flecha").css("left", -40);
				$("#flecha").css("top", 200);
				var random = parseInt(Math.random() * 300);
				$("#alvo").css("top", random);
				mX = 0; mY = 0;
				pontos = pontos + 100;
				acertos++;
				window.clearInterval(rep);
				if (acertos >= 5){
					fase++;
					if(fase < 15){
						vidas++;
					}
					acertos = 0;
				}
				colisao = false;
				aviso = false;
			} else {
			vidas--;
			mX = 0; mY = 0;
			$("#flecha").css("left", -40);
			$("#flecha").css("top", 200);
			var random = parseInt(Math.random() * 300);
			$("#alvo").css("top", random);
			window.clearInterval(rep);
			aviso = false;
		}
		}
	}
}

function reposicionar(){
	var element = document.getElementById("flecha");
	var xFLECHA = Math.round(element.getBoundingClientRect().left);
	var yFLECHA = Math.round(element.getBoundingClientRect().top);
	var element2 = document.getElementById("alvo");
    var xALVO = element2.getBoundingClientRect().left;	
	
	if (yFLECHA <= 127){
		aviso = true;
	} else if (yFLECHA >= 500){
		aviso = true;
	} else if (xFLECHA >= xALVO - 70){
	    aviso = true;
	}
}

function placar(){
	$("#placar").html("<h2> Vidas: " + vidas + " Fase: " + fase + " Pontos: " + pontos + "</h2>");
}

function reiniciar(){
	location.reload();
}