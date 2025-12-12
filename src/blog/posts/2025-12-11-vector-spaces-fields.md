---
layout: layouts/post.njk
title: Vector Spaces and Fields
date: 2025-12-11
description: A note about why people say "Vector Space V over Field F"
tags: [meta, linear-algebra, field, vector-space, scalar, vector]
---

# Vector Spaces _over_ Fields

Most of us first encounter vector spaces in a setting that feels relentlessly concrete: arrows on a page, coordinates lined up in a neat little column, some sense that we can stretch or shrink them and that everything stays in proportion. It’s clean. It’s sensible. It’s linear.

Then, somewhere down the line, someone insists on saying something like *"V is a vector space over F"*, and suddenly everything that once felt intuitive now feels scrambled and confusing. If you’ve ever wondered why mathematicians insist on this phrasing or why anyone working in machine learning and AI should care, then this post is for you.

This is not a technical tour. It’s a conceptual one, with an eye toward the relationship between a Vector Space and its underlying Field

## Why might you care?

If you're building models (i.e., neural, symbolic, hybrid) or designing new representational frameworks, understanding vector spaces and fields isn't optional. It's foundational. Modern day AI systems (aka transformers, LLMs) are grounded in internal representations that are vector spaces.  

So, if we are to build secure, transparent, interpretable systes, we need to be able to understand how our machine stores meaning, how meanings are combined, and how those meanings degrade or sharpen. We would love to understand where human-understandable concepts live in the numbers and which parts are interpretable. 

Choosing a vector space is essentially choosing a worldview. And choosing a field is choosing the laws that govern that world. It should be uncontroversial that better systems come from better choices of structure. Better choices come from understanding what these structures let us do. And concepts in linear algebra and particularly vector spaces gives us that understanding. 

That is why we should care. 


## The Field $\mathbb{F}$

I think of the field like a numbering system along with some operations (like add, subtract, multiply, divide etc.). So in such a numbering system (aka Field), we decide what the numbers are and how they behave. For example, think about the set of all real numbers $\mathbb{R}$ (e.g., 1.1, 456.34, -34.0, ...). Now, when combined with rules for addition, subtraction, multiplication and division, we have a `field`. Each item in our set of numbers is called a `scalar`. We use the notation $\mathbb{F}$ to generally refer to any field (be it the set of real numbers or whatever). It is worth noting that a field can be any collection of scalars together with operations, not necessarily numbers. But, a field is required to have defined the core operations of addition and multiplication, and these operations need to possess certain properties like commutativity (e.g., $a+b = b+a$). 

So, a field is some set of numbers we call scalars, an addition operation and multiplication operation defined over those scalars, and finally, confirmation that those operations follow a certain set of rules (like commutativity). That's it. 

You could even have a tiny two-element field $\mathbb{F} = \{0,1\}$, where arithmetic is done modulo 2 (i.e., $1+1 = 0$, like binary). This is a perfectly valid field. The point isn't the size. The point is whether the arithmetic is coherent—whether the game behaves consistently.

Crucially, when you pick a field, you're deciding what "scalars" you're allowed to use. You’re deciding what it means to combine things (i.e., add scalars), and stretch things (i.e., multiply scalars). And that choice quietly determines everything else.

## The Vector Space $V$

If the field is like a set of paint colors, then the vector space is the canvas. I like to think about a vector space also as a set of things. Except this time it is not necessarily a set of scalars like our field $\mathbb{F}$, but a set of objects (we might call a vector) that uses scalars from some field. This means that a vector space is what you get when you put two ingredients together:

1. A set of objects you want to treat like vectors. (Don't worry about any geometric or visual meaning to this for now. Just think numbers and lists of numbers)
2. A field that tells you how those objects respond to scaling and addition.

That's it. The vectors don’t do anything on their own. The scaling doesn’t do anything on its own. Put them together and you get a universe: a space with structure. This is why mathematicians always say *“a vector space over a field.”* It’s not pedantry. It’s a reminder that the same set of objects can behave very differently depending on which field you hand it.

A simple example: the complex numbers (like $x = 3.5 + 4.2i$). The field of complex numbers $\mathbb{C}$ is the set of all complex numbers like $x$ together with addition and multiplication defined. That's just the complex numbers. Now, if we want to build a vector space $V$ **over** $\mathbb{C}$, then that means we are treating each complex number $x$ as a single vector object, where such a vector object consists of a scalar, i.e., the complex number itself. This means our vector space is simply a number line containing all the complex numbers. And each point on that number line is a vector object defined as a complex number itself. There is really no distinction between vectors and scalars in this case. 

On the other hand, we could think differently. We could break down the complex number into its real and imaginary parts, and treat those as separate scalar quantities. In this case, we might say that our vector space is $V$ **over** $\mathbb{R}$, the field of real numbers, which means that the scalars are real numbers like 3.5 or 4.2. We might also define our vector space to specify that each object or vector in our space is a **list** of two real numbers and written like this: $(x,y)$ where $x,y~\in~\mathbb{R}$. So our vector space then is the set of all such pairs of numbers, which begins to look a bit like 2D space, with an $x$ and $y$ coordinate. This intuition corresponds with the notion of polar coordinates and representing complex numbers on a 2D plane. 

Same set of objects (vectors). Different rules. Different geometry.



## 3. When Things Break

At this point you might be asking if we can pick our field and pair it with whatever vector space we want to define. It’s tempting to believe we can mix whatever set we like with whatever field we like. But this isn’t true. The rules have to align.

A classic example: Does it make sense to define $\mathbb{R}^2$ as a vector space over $\mathbb{F}_2$, the field where you have two scalars $\{0,1\}$ and the weird addition operation -- $1+1=0$? Short answer, no! Long answer:

Everything looks fine until you test the distributive law. Then it collapses. The addition operation in the field requires $1+1=0$, but vector addition in $\mathbb{R}^2$ is defined as typical elementwise addition. Let's work through this. Say we have two scalars $\alpha, \beta \in \mathbb{F}$, and let's consider a vector $\mathbf{u} \in V$.  The distributive property in the vector space requires: $(\alpha + \beta)\mathbf{u} = \alpha \mathbf{u} + \beta \mathbf{u}$. 

Now, if we let $\alpha = 1$ and $\beta = 1$. The left hand side then becomes $(1+1).\mathbf{u}$, which is simplified per the weird addition rule in $\mathbb{F}$ to $0.\mathbf{u}$ which becomees $(0,0)$, since we have a 2D vector space. 

The right hand side becomes $1.\mathbf{u} + 1.\mathbf{u}$. If we consider $\mathbf{u} = (u_1, u_2)$ then we essentially have $(u_1,u_2) + (u_1,u_2)$, which can be simplified to $(2u_1, 2u_2)$. Unless both $u_1,u_2 = 0$, this is not equal to the left hand side $(0,0)$ we saw earlier. 

This is important. It tells us that vector spaces aren’t just *things*. They’re *relationships* between a set and a field. If you change the field, you change the relationship.



## 4. Why This Matters for Machine Learning and Cognitive Systems

If this were just abstract algebra, it’d be fine to leave it in the algebra books. But it turns out that the choice of field shapes how intelligenc expresses it self

### (a) Superposition Depends on the Field

In machine learning, we routinely combine representations. But combination means something different depending on the field.

* Over the reals, superposition is smooth, weighted, and geometric.
* Over the complex numbers, superposition introduces phase—interference, rotation, structure.
* Over $\mathbf{F}_2$, superposition becomes XOR, a sharp, symbolic merge.

These aren’t just different flavors. They are different ontologies.

### (b) Training Depends on Calculus, and Calculus Depends on the Field

Gradient descent needs real numbers. It needs smoothness. You can’t take derivatives in $\mathbf{F}_2$. You can’t nudge a representation by epsilon if epsilon doesn’t exist. This is why neural networks live in $\mathbf{R}$

### \(c) Interpretability Depends on Geometry, and Geometry Depends on the Field

Much of what we now call mechanistic interpretability works because real vector spaces support angles, projections, decompositions and orthogonality. In other words: **interpretability is a geometric activity.** Change the field and the geometry changes underneath you.

### (d) Capacity and Structure in Hyperdimensional Computing/Vector Symbolic Algebras (HDC/VSA) Depend on the Field

Although we haven't talked about it in this post, there are some promising neurosymbolic representations that fall under the topic of Hyperdimensional Computing/Vector Symbolic Algebras (HDC/VSA), where we work with vector spaces too.

* Binary VSAs use $\mathbf{F}_2$ and XOR.
* HRR uses the reals and circular convolution.
* FHRR uses complex numbers and phase binding.

Each inherits its expressive power from the field it sits on. If you pick the wrong field for the task, the entire architecture drifts out of tune.


## 5. The Bigger Point: Fields Quietly Encode How a System Can Think

We tend to treat vector spaces as if they're just containers for representations. But the field is the deeper story. The field determines what combinations are allowed and what distortions count as "small". They define what similarity means, what structure survives noise, and whether projections or gradients even make sense. When you choose a field, you're choosing the **laws of thought** for your representational system.

Real numbers support intuition that feels continuous and geometric. Complex numbers support intuition that feels rotational, cyclic, phase-based. Binary fields support intuition that feels discrete, symbolic, categorical. The field isn't the backdrop. It’s the physics.


