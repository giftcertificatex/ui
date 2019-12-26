package com.certificate.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping(value = {"", "/home"})
    public String homePage() {
        return "index";
    }

    @RequestMapping("/providers")
    public String providersPage() {
        return "providers";
    }

    @RequestMapping("/about")
    public String aboutPage() {
        return "about";
    }

    @RequestMapping("/contact")
    public String contactPage() {
        return "contact";
    }

}
