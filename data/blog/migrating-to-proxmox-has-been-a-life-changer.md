---
title: '⛴️ Building My Private Home Cloud: A Frontend Dev''s Journey with Zero Trust & Docker'
date: 2026-02-07T14:19:00.503Z
publishDate: 2026-02-07T14:18:49.737Z
tags:
  - productivity
draft: false
summary: 'Upgrading my home lab from Windows 10 to Proxmox was the best decision I made this year! Learning a ton about Docker, home networking and more. My experience with this upgrade has made my life stress free with my original home lab. Also, expanded my knowledge with Cloudflare services past service-workers :) '
author: Kien
---

## Introduction

I'll never forget the day my Home Assistant setup decided to throw up on me. It was like a tiny, temperamental server in a virtual machine, flaking out on me whenever I needed it most. That experience sparked something in me. I realized that I did not have to live with this kind of instability.

Last weekend, I had upgraded my home lab from Windows 10 to Proxmox. It was a game changer. Suddenly, I had a solid foundation for my infrastructure, and I could start building my private cloud from scratch.

## The Problem

I'll be honest. I was not exactly sure what I wanted when I started this journey. I knew I wanted to access my home services like qBittorrent, Sonarr, Radarr, Overseerr, and my NAS from anywhere. But I also did not want to expose my home network to the internet or trust port forwarding.

I tried using VPNs, but they felt clunky, slow, and brittle across devices. And let’s be real, configuring VPNs on routers is not exactly fun and having used Tailwind, it just wasn't convenient as I thought it was going to be as it clashed with my NextDNS service I had on my phone and devices.

## The Goal

I wanted a seamless, secure single sign on experience for all my home services. Any device, anywhere, no VPN toggling, no open ports, and no anxiety about exposing my home network to the internet.

## My Background

As a frontend developer, I understand web architecture, routing, auth flows, and developer tooling. But backend infrastructure and networking always felt like a black box. This post is about how I applied frontend mental models to demystify home servers, containers, and Zero Trust networking.

In my opinion, the biggest difference between frontend and backend development is that one deals with invisible worlds like code, while the other deals with tangible things like services. But both rely on the same fundamentals: isolation, security, and reliability.

## Section 1: The Foundation - Home Server and Docker

### Proxmox and LXC

Proxmox became my trusty sidekick in this journey. I run Docker inside an LXC container, which effectively acts like a lightweight virtual machine dedicated to my services. It was faster, more stable, and much easier to reason about than my old Windows VM.

I also discovered the joy of `docker-compose.yml` files. They are basically my `package.json` for infrastructure. Everything became simpler once I broke it down into smaller, isolated components.

### Docker and Portainer

Docker finally clicked for me once I reframed it in frontend terms. Containers feel like isolated microservices, each with their own environment, dependencies, and security context.

Portainer gave me a visual interface to manage everything. Seeing my entire stack running and healthy in one place was incredibly satisfying.

### Gluetun as a VPN Container

For torrents, I use Gluetun as a VPN container. Instead of configuring VPN clients inside individual apps, Gluetun encapsulates all VPN complexity and exposes a secure network boundary.

Other containers simply route traffic through it. This felt very similar to using a secure proxy layer in web applications.

## Section 2: The Internal Traffic Director - Nginx Proxy Manager

### The Routing Problem

I had one server and many services. Each one needed to be accessible via a clean hostname. It felt like building a web app without a router.

That is when I discovered Nginx Proxy Manager. It acts like an API gateway for my home network and gave me:

- Clean URLs without weird ports
- Centralized routing
- A single place to manage SSL

HTTPS everywhere instantly made the setup feel more professional and trustworthy.

## Section 3: Bridging the Gap - Cloudflare Tunnel

### Why Port Forwarding Is a Bad Idea

Opening router ports felt like inviting the internet directly into my house. It exposes my IP, increases attack surface, and puts all the responsibility on my firewall.

Instead, I used Cloudflare Tunnel. My server makes an outbound only connection to Cloudflare.

- No open ports
- No exposed home IP
- Cloudflare becomes the public edge

## Section 4: The Bouncer - Cloudflare Access

### Authentication Comes Last

Once my services were reachable, the next question was obvious. Who is allowed in?

I absolutely did not want my home dashboard accessible to the public.

Cloudflare Access solved this by applying Zero Trust principles to every service.

- Every request is treated as hostile until authenticated
- No implicit trust just because something is online

I set up a wildcard policy for `*.kien.dev`, which means all services automatically inherit authentication.

Using Google OAuth gave me instant single sign on across everything. One identity, no per app logins, and strong defaults.

PKCE added another layer of protection, and Instant Auth made the experience feel seamless once logged in.

## Section 5: Automating the Media Stack

This stack includes Sonarr, Radarr, Overseerr, Prowlarr, and qBittorrent. Each service has a focused responsibility, just like microservices in a production system.

Nginx Proxy Manager handles routing, and Gluetun ensures torrent traffic stays isolated and secure.

One quick scare was discovering default admin credentials still enabled. Locking those down was a reminder that security does not stop at the edge.

## The Payoff - A Secure Home Cloud

I ended up with a secure home cloud that gives me:

- Secure remote access to all my home apps
- No open ports
- Single sign on everywhere
- Clean URLs and HTTPS

The big takeaway for frontend developers is this: networking is just another layer of logic. Docker is infrastructure you can reason about. The edge matters more than ever.

As a final win, I can now run tools like n8n locally, safely exposed, and fully authenticated. My home server is no longer a fragile box under my desk. It is my private cloud.

I can't wait to use n8n and build automation projects and sending data through my local LLM to process my data privately and securely!
