from pyexpat import model
from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm,PasswordChangeForm
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *


class CustomUserCreationForm(UserCreationForm,forms.Form):
    is_fromEsmt= forms.BooleanField(required=False,label="Etudiant de L'ESMT",widget=forms.CheckboxInput(attrs={'type': 'checkbox'}))
    is_newsletter=forms.BooleanField(required=False,label="S'abonner a la newsletter",widget=forms.CheckboxInput(attrs={'type': 'checkbox'}))
    class Meta:
        model = User
        fields = ('email','is_fromEsmt','is_newsletter')


class CustomUserChangeForm(UserChangeForm,forms.Form):
    is_fromEsmt= forms.BooleanField(required=False,label="Etudiant de L'ESMT",widget=forms.CheckboxInput(attrs={'type': 'checkbox'}))
    is_newsletter=forms.BooleanField(required=False,label="S'abonner a la newsletter",widget=forms.CheckboxInput(attrs={'type': 'checkbox'}))
    class Meta:
        model = User
        fields = ()
class passwordChangeForm(PasswordChangeForm,forms.Form):
    class Meta:
        model=User
        fields = ()
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

class EpreuveForm(forms.Form):
    nom = forms.CharField(
        required=True,
        label="Nom",
        error_messages={
            'required':'veuillez saisir le nom de l\'epreuve svp',
            },
        widget=forms.TextInput(
            attrs={
                'type':'text',
                'class':'form-control'
            }
        )
    )
    matiere = forms.CharField(
        max_length=200,
        label="Matiere",
        required=True,
        error_messages={
            'required':'veuillez saisir le nom de la matiere svp',
            'max_length':'vous avez dépassé le nombre maximal de caractères autorisé'
            },
        widget=forms.TextInput(
            attrs={
                'type':'text',
                'class':'form-control'
            }
        )
    )
    filiere = forms.CharField(
        max_length=200,
        label="Filiere",
        required=True,
        error_messages={
            'required':'veuillez saisir le nom de la filiere svp',
            'max_length':'vous avez dépassé le nombre maximal de caractères autorisé'
            },
        widget=forms.TextInput(
            attrs={
                'type':'text',
                'class':'form-control'
            }
        )
    )
    nomProfesseur = forms.CharField(
        required=True,
        label="Nom du prof",
        error_messages={
            'required':'veuillez saisir le nom de l\'epreuve svp',
            },
        widget=forms.TextInput(
            attrs={
                'type':'text',
                'class':'form-control'
            }
        )
    )
    contenu = forms.FileField(
        allow_empty_file=True,
        label="upload",
        widget=forms.FileInput(
            attrs={
                'class':'form-control'
            }
        )
    )
        
    
class CorrectionForm(forms.Form):
    nom = forms.CharField(
        required=True,
        label="Nom",
        error_messages={
            'required':'veuillez saisir le nom de l\'epreuve svp',
            },
        widget=forms.TextInput(
            attrs={
                'type':'text',
                'class':'form-control'
            }
        )
    )
    matiere = forms.CharField(
        max_length=200,
        label="Matiere",
        required=True,
        error_messages={
            'required':'veuillez saisir le nom de la matiere svp',
            'max_length':'vous avez dépassé le nombre maximal de caractères autorisé'
            },
        widget=forms.TextInput(
            attrs={
                'type':'text',
                'class':'form-control'
            }
        )
    )
    filiere = forms.CharField(
        max_length=200,
        label="Filiere",
        required=True,
        error_messages={
            'required':'veuillez saisir le nom de la filiere svp',
            'max_length':'vous avez dépassé le nombre maximal de caractères autorisé'
            },
        widget=forms.TextInput(
            attrs={
                'type':'text',
                'class':'form-control'
            }
        )
    )
    contenu = forms.FileField(
        allow_empty_file=True,
        label="upload",
        widget=forms.FileInput(
            attrs={
                'class':'form-control'
            }
        )
    )

class LoginForm(forms.Form):
    username = forms.EmailField(
        required=True,
        label="Nom",
        error_messages={
            'required':'veuillez saisir votre mail',
            },
        widget=forms.TextInput(
            attrs={
                'type':'email',
                'class':'form-control'
            }
        )
    )

    password = forms.CharField(
        required=True,
        label="Mot de passe",
        error_messages={
            'required':'veuillez saisir votre mot de passe'
        },
        widget=forms.PasswordInput(
            attrs={
                'class':'form-control'
            }
        )
    )