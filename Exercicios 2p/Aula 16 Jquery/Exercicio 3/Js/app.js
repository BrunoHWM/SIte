// Document is ready 
$(document).ready(function () { 

	// Validate Username 
	$("#usercheck").hide(); 
	let usernameError = true; 
	$("#usernames").keyup(function () { 
		validateUsername(); 
	}); 

	//validando o nome de usuario 
	function validateUsername() { 
		let usernameValue = $("#usernames").val(); 
		if (usernameValue.length == "") { 
			$("#usercheck").show(); 
			usernameError = false; 
			return false; 
		} else if (usernameValue.length < 3 || usernameValue.length > 10) { 
			$("#usercheck").show(); 
			$("#usercheck").html("Seu nome precisa ter de 3 a 10 letras"); 
			usernameError = false; 
			return false; 
		} else { 
			$("#usercheck").hide(); 
		} 
	} 

	// validando o Email 
	const email = document.getElementById("email"); 
	email.addEventListener("blur", () => { 
		let regex = 
		/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/; 
		let s = email.value; 
		if (regex.test(s)) { 
			email.classList.remove("is-invalid"); 
			emailError = true; 
		} else { 
			email.classList.add("is-invalid"); 
			emailError = false; 
		} 
	}); 

	// Validando a senha
	$("#passcheck").hide(); 
	let passwordError = true; 
	$("#password").keyup(function () { 
		validatePassword(); 
	}); 
	function validatePassword() { 
		let passwordValue = $("#password").val(); 
		if (passwordValue.length == "") { 
			$("#passcheck").show(); 
			passwordError = false; 
			return false; 
		} 
		if (passwordValue.length < 3 || passwordValue.length > 10) { 
			$("#passcheck").show(); 
			$("#passcheck").html( 
				"Sua senha precisa ter entre 3 e 10 letras"
			); 
			$("#passcheck").css("color", "red"); 
			passwordError = false; 
			return false; 
		} else { 
			$("#passcheck").hide(); 
		} 
	} 

	// Validando senha 2
	$("#conpasscheck").hide(); 
	let confirmPasswordError = true; 
	$("#conpassword").keyup(function () { 
		validateConfirmPassword(); 
	}); 
	function validateConfirmPassword() { 
		let confirmPasswordValue = $("#conpassword").val(); 
		let passwordValue = $("#password").val(); 
		if (passwordValue != confirmPasswordValue) { 
			$("#conpasscheck").show(); 
			$("#conpasscheck").html("Senha não corresponde "); 
			$("#conpasscheck").css("color", "red"); 
			confirmPasswordError = false; 
			return false; 
		} else { 
			$("#conpasscheck").hide(); 
		} 
	} 

	// botão Submit 
	$("#submitbtn").click(function () { 
		validateUsername(); 
		validatePassword(); 
		validateConfirmPassword(); 
		validateEmail(); 
		if ( 
			usernameError == true && 
			passwordError == true && 
			confirmPasswordError == true && 
			emailError == true
		) { 
			return true; 
		} else { 
			return false; 
		} 
	}); 
});
