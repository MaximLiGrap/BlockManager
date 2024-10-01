class BlockManager {
    private container: HTMLElement;
    private blocks: HTMLElement[] = [];
    private removedBlocks: HTMLElement[] = [];
    private blockHeight: number = 100;
    private maxVisibleBlocks: number = 5;
    private buttonRemove: HTMLButtonElement
    private buttonAdd: HTMLButtonElement

    constructor() {
        this.container =  this.createContainer();
        this.container.style.height = `${this.maxVisibleBlocks * this.blockHeight}px`;
        this.container.style.overflow = 'hidden';
        this.buttonAdd = this.createButton("+", 'addButton');
        this.buttonRemove = this.createButton("-", 'removeButton');
    }

    private createContainer() { 
        const container = document.createElement('div');
        document.body.appendChild(container);
        return container
    }

    private createButton(text : string, buttonId:string) { 
        const button = document.createElement('button');
        button.textContent = text
        button.id = buttonId
        document.body.appendChild(button);
        
        return button
    }

    addBlock() {
        const block = document.createElement('div');
        block.style.height = `${this.blockHeight}px`;
        block.style.backgroundColor = this.getRandomColor();
        this.blocks.push(block);
        this.container.appendChild(block);

        if (this.blocks.length > this.maxVisibleBlocks) {
            this.removeTopBlock();
        }
    }

    removeBlock() {
        if (this.blocks.length > 0) {
            const block = this.blocks.pop();
            if(block)
            this.container.removeChild(block);

            if (this.blocks.length < this.maxVisibleBlocks && this.removedBlocks.length > 0) {
                this.restoreTopBlock();
            }
        }
    }

    private removeTopBlock() {
        const block = this.blocks.shift();
        if (block) {
            this.removedBlocks.push(block);
            this.container.removeChild(block);
        }
    }

    private restoreTopBlock() {
        const block = this.removedBlocks.pop();
        if (block) {
            this.blocks.unshift(block);
            this.container.insertBefore(block, this.container.firstChild);
        }
    }

    private getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

const blockManager = new BlockManager();

document.getElementById('addButton')?.addEventListener('click', () => blockManager.addBlock());
document.getElementById('removeButton')?.addEventListener('click', () => blockManager.removeBlock());