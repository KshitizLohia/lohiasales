"""lohiasales URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from tools import views


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index_page, name='index_page'),
    url(r'^index$', views.index_page, name='index_page'),
    url(r'^aboutus$', views.about_page, name='about_page'),
    url(r'^blogs', views.blog_page, name='blogs'),
    url(r'^blog1', views.blog1_page, name='blog1'),
    url(r'^blog2', views.blog2_page, name='blog2'),
    url(r'^blog3', views.blog3_page, name='blog3'),
    url(r'^contactus', views.contact_page, name='contactus'),
    url(r'^gensets', views.gensets_page, name='gensets'),
    url(r'^solar', views.solar_page, name='solar-page'),
    url(r'^testimonial', views.testimonial_page, name='testimonial'),
    url(r'^pipes', views.pipes_page, name='pipes'),
    url(r'^lubricants', views.lubricants_page, name='lubricants'),
    url(r'^pumps', views.pumps_page, name='pumps'),
]

