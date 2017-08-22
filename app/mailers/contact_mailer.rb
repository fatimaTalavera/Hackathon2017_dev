class ContactMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def contact_email(data)
    @name = data['name']
    @email = data['email']
    @phone = data['phone']
    @message  = data['message']
    emails = ['diazpany@gmail.com']
    mail(to: emails, subject: 'Contacto - Caminandoal2030')
  end
end
