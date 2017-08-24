class ContactMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def contact_email(data)
    emails = ['diazpany@gmail.com']#, 'fa.talavera95@gmail.com', 'rpalau@stp.gov.py']
    mail(to: emails, subject: 'Contacto - Caminandoal2030') do  |format|
      format.html {
        render locals: { data: data }
      }
    end

  end
end
