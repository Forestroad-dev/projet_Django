from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.urls import reverse
from django.utils import timezone
# Create your models here.
class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email address', unique=True)
    is_fromEsmt = models.BooleanField(default=False)
    is_newsletter = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
   

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    def __str__(self):
        return self.email
    
    def get_update_url(self):
        return reverse('update',kwargs={'pk':self.id})
        
class Epreuve(models.Model):
    id = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=100)
    matiere = models.CharField(max_length=200)
    filiere = models.CharField(max_length=200)
    nomProfesseur = models.CharField(max_length=100)
    contenu = models.FileField(upload_to="sujets/%Y/%m/%d")
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def get_update_url(self):
        return reverse('update',kwargs={'pk':self.id})
    
    def get_delete_url(self):
        return reverse('delete',kwargs={'pk':self.id})

class Correction(models.Model):
    id = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=100)
    matiere = models.CharField(max_length=200)
    filiere = models.CharField(max_length=200)
    contenu = models.FileField(upload_to="corrections/%Y/%m/%d")
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    idEpreuve = models.ForeignKey(Epreuve,on_delete=models.CASCADE,related_name="epreuve")

    def get_update_url(self):
        return reverse('update',kwargs={'pk':self.id})
    
    def get_delete_url(self):
        return reverse('delete',kwargs={'pk':self.id})
