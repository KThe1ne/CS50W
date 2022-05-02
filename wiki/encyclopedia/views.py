from http.client import HTTPResponse
from django import forms
from django.shortcuts import render
from django.http import HttpResponse
from django.urls import reverse

from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def wiki(request, entry):
    return render(request, "wiki/index.html",{
        "wiki": util.get_entry(entry)
    })

def search(request):
    entry = request.GET.get("q")
    if (util.get_entry(entry)):

        return render(request, "wiki/index.html",{
            "wiki": util.get_entry(entry)
        })
    
    else:

        return render(request, "search/index.html",{
            "queryRes": util.search_entry(entry)
        })

def newEntry(request):
    class newEntryForm(forms.Form):
        title = forms.CharField(label="Title", max_length=50)
        content = forms.CharField(label="Content")

    if request.method == "POST":
        #return HttpResponse(request.POST.get("title"))
        form = newEntryForm(request.POST)
        if form.is_valid():
            #return HttpResponse(form.cleaned_data["title"])
            if util.get_entry(form.cleaned_data["title"]):
                return render(request, reverse("newentry"),{
                    "form": form
                })
            


    return render(request, "newEntry/index.html",{
        "form": newEntryForm()
    })