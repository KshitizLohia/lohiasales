from django.shortcuts import render, render_to_response
from django.template import RequestContext
from models import IndexModel
from models import ContactModel

# Create your views here.
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect





def index_page(request):
        message = ""
        if request.method == 'POST':
            index_model = IndexModel()
            index_model.first_name = request.POST['fname']
            index_model.last_name = request.POST['lname']
            index_model.email = request.POST['emailid']
            index_model.phone = request.POST['phoneno']
            index_model.zip = request.POST['zipcode']
            index_model.save()
            message = "Thanks for your response. Your response is successfully saved"

        else:
            campaign_model = IndexModel()
        return render_to_response('index.html', {'message':message}, RequestContext(request))

def about_page(request):
        return render_to_response('about.html')

def pumps_page(request):
        return render_to_response('deatail-page.html')

def blog_page(request):
        return render_to_response('blog.html')

def blog1_page(request):
        return render_to_response('blog-deatail-one.html')

def blog2_page(request):
        return render_to_response('blog-deatail-two.html')

def blog3_page(request):
        return render_to_response('blog-deatail-three.html')

def contact_page(request):
        message = ""
        if request.method == 'POST':
            contact_model = ContactModel()
            contact_model.name = request.POST['name']
            contact_model.email = request.POST['mail']
            contact_model.subject = request.POST['subject']
            contact_model.message = request.POST['message']

            contact_model.save()
            message = "Thanks for your response. Your response is successfully saved"

        else:
            contact_model = ContactModel()
        return render_to_response('contact.html', {'message':message}, RequestContext(request))

def gensets_page(request):
        return render_to_response('gensets.html')

def lubricants_page(request):
        return render_to_response('lubricants.html')

def pipes_page(request):
        return render_to_response('pipes.html')

def solar_page(request):

        return render_to_response('solar-page.html')

def testimonial_page(request):
        return render_to_response('testimonial.html')