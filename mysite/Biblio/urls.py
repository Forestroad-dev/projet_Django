"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from Biblio.views import *
from Biblio.views import *
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path('',index,name='home'),
    path('connexion/',LoginView.as_view(),name='connexion'),
    path('logout/', LogoutView.as_view(),name='logout'),
    path('inscription/',create_user,name='inscription'),
    path('biblio/', login_required(TemplateView.as_view(template_name='biblio.html'))),
    path('update/', login_required(update_user),name='update'),
    path('password/', login_required(changePassword_user),name='password'),
    path('create/epreuve', login_required(create_epreuve),name='create_epreuve'),
    path('update/epreuve/<int:pk>/', login_required(update_epreuve),name='update_epreuve'),
    path('create/correction', login_required(create_correction),name='create_correction'),
    path('update/correction/<int:pk>/', login_required(update_correction),name='update_correction'),
]

