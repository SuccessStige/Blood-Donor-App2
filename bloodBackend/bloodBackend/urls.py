"""
URL configuration for bloodBackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path, include
from django.contrib import admin
from django.conf import settings # new
from  django.conf.urls.static import static #new
from .views import frontend
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# urlpatterns = [
#     path("admin/", admin.site.urls),

#     # JWT Auth
#     path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
#     path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

#     # App APIs
#     path("api/auth/", include("bloodaccounts.urls")),        # registration & login
#     path("api/donors/", include("donoraccounts.urls")),      # donor related
#     path("api/blood/", include("blood.urls")),               # blood request & stats

#     # React frontend
#     path("", frontend),
# ]
urlpatterns = [
    path("admin/", admin.site.urls), 
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    
    path("api/", include("bloodaccounts.urls")),
    path("api/", include("donoraccounts.urls")),
    path("api/blood/", include("donoraccounts.urls")),
    path("api/", include("blood.urls")),
    path("", frontend),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_URL)