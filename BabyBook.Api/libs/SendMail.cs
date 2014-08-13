using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace BabyBook.Api.libs
{
    public class SendMail
    {
        public bool EnvioMail(string mailreceptor, string asunto, string cuerpoMensaje)
        {

        System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();

            msg.To.Add(mailreceptor);
            msg.From = new System.Net.Mail.MailAddress("babybookweb@gmail.com", "Admin", System.Text.Encoding.UTF8);
            msg.Subject = asunto;
            msg.SubjectEncoding = System.Text.Encoding.UTF8;
            msg.Body = cuerpoMensaje;
            msg.BodyEncoding = System.Text.Encoding.UTF8;
            msg.IsBodyHtml = false;

            SmtpClient client = new SmtpClient();

            client.Credentials = new System.Net.NetworkCredential("babybookweb@gmail.com", "littlebaby2014");

            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;

            try
            {
                client.Send(msg);

                
            }
            catch (System.Net.Mail.SmtpException ex)
            {

                Console.WriteLine(ex.Message);
                Console.ReadLine();

            }

            return true;
        }
    }
}