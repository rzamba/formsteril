from django.http import HttpResponse
from django.core.mail import send_mail, BadHeaderError, EmailMessage

def enviarcontato(request):    
    subject = 'Contato enviado por ' + request.POST.get('name', '')
    from_email = request.POST.get('email', '')    
    
    telefone = request.POST.get('phone', '')
    message = request.POST.get('message', '') + '\n Fone:' + telefone
       
    if subject and from_email:
        try:
            email = EmailMessage(subject, message, from_email, ['contato@formsteril.com.br'])
            email.send()            
        except BadHeaderError:
            return HttpResponse("500 bad request")
        return HttpResponse("200 ok")
        # return HttpResponseRedirect('/contact/thanks/')
    else:
        # In reality we'd use a form class
        # to get proper validation errors.
        return HttpResponse("<script>alert('Favor preencher o nome e o email')</script>")
    
    
def enviarcv(request):    
    subject = 'Curriculum enviado por ' + request.POST.get('nome', '')    
    telefone = request.POST.get('telefone', '')
    cargo = request.POST.get('cargo', '')
    message = request.POST.get('body', '') + '\n Fone:' + telefone + '\n Cargo:' + cargo
    from_email = request.POST.get('email', '')
    # Verificando campos obrigatorios 
    if subject and from_email:
        try:            
            email = EmailMessage(subject, message, from_email, ['queroser@adlconsultoria.com.br'])
            if request.FILES:
                file = request.FILES['arquivo'].read()
                filename = request.FILES['arquivo'].name
                filesize= request.FILES['arquivo'].size   
                # Validado o tamnho do arquivo
                if filesize >= 500001:
                    return HttpResponse("<script>alert('O arquivo do curriculum deve ser menor que 500kbytes');</script>")           
                email.attach(filename, file)
            email.send()            
        except BadHeaderError:
            return HttpResponse("<script>alert('Ocorreu um erro no envio');</script>")        
        return HttpResponse("<script>alert('Mensagem recebida com sucesso');</script>")
        # return HttpResponseRedirect('/contact/thanks/')
    else:
        # In reality we'd use a form class
        # to get proper validation errors.
        return HttpResponse("<script>alert('Favor preencher o nome e o email')</script>")

def healthcheck(request):
    return HttpResponse("OK 200")
