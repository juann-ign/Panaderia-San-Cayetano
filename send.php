<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // 1. Capturar y sanitizar los datos
    $name    = htmlspecialchars(trim($_POST['name']));
    $email   = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

  // 2. Definir destinatario y asunto
    $to      = "juanignacioatencio1@gmail.com";
    $subject = "Nuevo mensaje desde el sitio web";

  // 3. Construir el cuerpo del mensaje
    $body = "Nombre: $name\n";
    $body .= "Correo: $email\n";
    $body .= "Mensaje:\n$message\n\n";
    $body .= "---\nEnviado desde www.panaderiasancayetano.com";

  // 4. Encabezados del correo
    $headers = "From: contacto@panaderiasancayetano.com\r\n";
    $headers .= "Reply-To: $email\r\n";

  // 5. Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado correctamente.";
    } else {
        echo "Hubo un error al enviar el mensaje.";
    }
}
?>