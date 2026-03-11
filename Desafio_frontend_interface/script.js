document.addEventListener("DOMContentLoaded", () => {

    // =======================================
    // Carrossel de Stories
    // =======================================
    const storiesWrapper = document.getElementById('storiesWrapper');
    const btnLeft = document.getElementById('scrollLeft');
    const btnRight = document.getElementById('scrollRight');

    // Esconde o botão da esquerda no início
    btnLeft.style.display = 'none';

    // Função que faz o movimento do carrossel
    const scrollCarousel = (direction) => {
        const scrollAmount = 300; 
        if (direction === 'left') {
            storiesWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            storiesWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    btnRight.addEventListener('click', () => scrollCarousel('right'));
    btnLeft.addEventListener('click', () => scrollCarousel('left'));

    // Fica vigiando a barra de rolagem
    storiesWrapper.addEventListener('scroll', () => {
        if (storiesWrapper.scrollLeft > 0) {
            btnLeft.style.display = 'flex'; 
        } else {
            btnLeft.style.display = 'none'; 
        }

        const isAtEnd = storiesWrapper.scrollLeft + storiesWrapper.clientWidth >= storiesWrapper.scrollWidth - 2;
        if (isAtEnd) {
            btnRight.style.display = 'none'; 
        } else {
            btnRight.style.display = 'flex'; 
        }
    });


    // =======================================
    // Botão Curtir (Coração)
    // =======================================
    const heartIcons = document.querySelectorAll('.post-actions .fa-heart');

    heartIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            // Alterna a classe do ícone entre contorno e preenchido
            this.classList.toggle('fa-regular');
            this.classList.toggle('fa-solid');
            // Adiciona/Remove a classe que pinta o coração de vermelho
            this.classList.toggle('liked');
        });
    });


    // =======================================
    // Botão Comentar (Janela Modal)
    // =======================================
    const commentModal = document.getElementById('commentModal');
    const commentInput = document.getElementById('commentInput');
    const submitCommentBtn = document.getElementById('submitComment');
    const cancelCommentBtn = document.getElementById('cancelComment');

    let postAtualParaComentar = null;

    const commentIcons = document.querySelectorAll('.post-actions .fa-comment');

    commentIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            postAtualParaComentar = this.closest('.post-footer'); 
            commentModal.style.display = 'flex'; 
            commentInput.focus(); 
        });
    });

    const fecharModal = () => {
        commentModal.style.display = 'none';
        commentInput.value = ''; 
        postAtualParaComentar = null; 
    };

    cancelCommentBtn.addEventListener('click', fecharModal);

    commentModal.addEventListener('click', (e) => {
        if (e.target === commentModal) fecharModal();
    });

    submitCommentBtn.addEventListener('click', () => {
        const textoComentario = commentInput.value.trim(); 

        if (textoComentario !== '' && postAtualParaComentar) {
            const novoComentario = document.createElement('p'); 
            novoComentario.className = 'caption';
            novoComentario.style.marginTop = '4px';
            novoComentario.innerHTML = `<span class="username">você</span> ${textoComentario}`; 

            postAtualParaComentar.appendChild(novoComentario); 

            fecharModal(); 
        }
    });


    // =======================================
    // Botão Salvar (Bandeirinha)
    // =======================================
    const saveIcons = document.querySelectorAll('.post-actions .fa-bookmark');

    saveIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            this.classList.toggle('fa-regular');
            this.classList.toggle('fa-solid');
        });
    });


    // =======================================
    // Lógica do Visualizador de Stories (Com Continuidade)
    // =======================================
    const storyModal = document.getElementById('storyModal');
    const closeStoryBtn = document.getElementById('closeStoryBtn');
    const storyProgressBar = document.getElementById('storyProgressBar');
    const storyModalPic = document.getElementById('storyModalPic');
    const storyModalName = document.getElementById('storyModalName');
    const storyModalImage = document.getElementById('storyModalImage');

    let storyTimeout;
    let currentStoryIndex = 0; 

    const storyItems = document.querySelectorAll('.story');

    const fecharStory = () => {
        storyModal.style.display = 'none';
        storyProgressBar.classList.remove('active');
        clearTimeout(storyTimeout);
    };

    const abrirStory = (index) => {
        if (index >= storyItems.length) {
            fecharStory();
            return;
        }

        currentStoryIndex = index;
        const storyAtual = storyItems[index];

        const imgPerfil = storyAtual.querySelector('img').src;
        const nomeUsuario = storyAtual.querySelector('p').innerText;

        storyModalPic.src = imgPerfil;
        storyModalName.innerText = nomeUsuario;

        storyModalImage.src = `https://picsum.photos/id/${40 + index}/400/800`;

        storyModal.style.display = 'flex';
        storyModalImage.style.cursor = 'pointer';

        storyProgressBar.classList.remove('active');
        void storyProgressBar.offsetWidth; 
        storyProgressBar.classList.add('active');

        clearTimeout(storyTimeout);

        storyTimeout = setTimeout(() => {
            abrirStory(currentStoryIndex + 1);
        }, 5000);
    };

    storyItems.forEach((story, index) => {
        story.addEventListener('click', () => {
            abrirStory(index);
        });
    });

    storyModalImage.addEventListener('click', () => {
        abrirStory(currentStoryIndex + 1);
    });

    closeStoryBtn.addEventListener('click', fecharStory);


    // =======================================
    // Botão Encaminhar (Aviãozinho com Toast)
    // =======================================
    const toastNotification = document.getElementById('toastNotification');
    const botoesEncaminhar = document.querySelectorAll('.post-actions .fa-paper-plane');

    let toastTimer; 

    botoesEncaminhar.forEach(botao => {
        botao.addEventListener('click', () => {
            toastNotification.classList.add('show');

            clearTimeout(toastTimer);

            toastTimer = setTimeout(() => {
                toastNotification.classList.remove('show');
            }, 3000);
        });
    });
// =======================================
    // Double-Tap para Curtir (Dois cliques na foto)
    // =======================================
    const postImages = document.querySelectorAll('.post-media');

    postImages.forEach(media => {
        // 'dblclick' é o evento que deteta o duplo clique rápido
        media.addEventListener('dblclick', function(e) {
            
            // 1. Cria o coração gigante dinamicamente
            const bigHeart = document.createElement('i');
            bigHeart.classList.add('fa-solid', 'fa-heart', 'big-heart-anim');
            
            // 2. Posiciona o coração exatamente onde o utilizador clicou com o rato
            bigHeart.style.left = `${e.clientX}px`;
            bigHeart.style.top = `${e.clientY}px`;
            
            // 3. Coloca o coração na tela
            document.body.appendChild(bigHeart);
            
            // 4. Procura o botão de curtir normal (pequeno) daquela publicação específica
            const postAtual = this.closest('.post');
            const btnCurtir = postAtual.querySelector('.post-actions .fa-heart');
            
            // Se ainda não estiver curtido, altera o ícone para o coração vermelho
            if (btnCurtir && !btnCurtir.classList.contains('liked')) {
                btnCurtir.classList.remove('fa-regular');
                btnCurtir.classList.add('fa-solid', 'liked');
            }

            // 5. Remove o coração gigante da memória depois da animação terminar (800ms)
            setTimeout(() => {
                bigHeart.remove();
            }, 800);
        });
    });
});