export const devopsSections = [
  {
    id: "cloud",
    label: "Cloud",
    topics: [
      {
        id: "azure-vnets",
        title: "Azure Virtual Networks",
        summary:
          "VNets are how you carve up your Azure network into isolated, secure segments. Get comfortable with subnets, NSGs, and peering early, because every other Azure service depends on getting networking right.",
        details: [
          "VNets give you an isolated logical network boundary in Azure. Resources talk to each other over private IPs, and you control what traffic flows where.",
          "Subnets break a VNet into smaller CIDR blocks. Some subnets can be delegated to specific Azure services like AKS, App Service, or SQL Managed Instance, which is something you'll use more than you expect.",
          "NSGs are stateful firewalls that live at the subnet or NIC level. I've seen teams get burned by misconfigured priority rules, so always double-check your inbound and outbound ordering.",
          "VNet peering links two VNets together, even across regions, with low-latency connectivity. No VPN gateway needed, which makes it a huge win for multi-region setups.",
          "Service endpoints let your VNet reach Azure PaaS services (Storage, SQL, Key Vault) over the Microsoft backbone instead of the public internet. I always enable these for any production workload.",
        ],
        commands: [
          "az network vnet create \\\n  --resource-group myRG \\\n  --name myVNet \\\n  --address-prefixes 10.0.0.0/16 \\\n  --subnet-name mySubnet \\\n  --subnet-address-prefixes 10.0.1.0/24",
          "az network vnet peering create \\\n  --resource-group myRG \\\n  --name myPeering \\\n  --vnet-name myVNet \\\n  --remote-vnet remoteVNet \\\n  --allow-vnet-access",
        ],
      },
      {
        id: "load-balancers",
        title: "Load Balancers",
        summary:
          "Load balancers keep your traffic flowing evenly across backends. Azure gives you L4 (Load Balancer) and L7 (Application Gateway) options, and picking the right one depends on what you're actually serving.",
        details: [
          "Azure Load Balancer is Layer 4 (TCP/UDP). It's fast, high-throughput, and great for distributing traffic across VMs, containers, or IP-based backends. I use it for non-HTTP workloads.",
          "Application Gateway is Layer 7 (HTTP/HTTPS). It handles SSL termination, URL path routing, session affinity, and WAF. If you're doing anything with web traffic, this is usually what you want.",
          "Health probes keep tabs on your backends. When something goes unhealthy, it gets pulled out of rotation until it recovers. I've caught more outages this way than I'd like to admit.",
          "Standard Load Balancer gives you cross-zone redundancy, outbound SNAT, and solid diagnostics via NSG flow logs and Metrics. It's worth the upgrade over Basic for anything serious.",
          "Session persistence (sticky sessions) can route by client IP or application cookie. I try to avoid them when I can, but sometimes you just need state to stick to a backend.",
        ],
        commands: [
          "az network lb create \\\n  --resource-group myRG \\\n  --name myLB \\\n  --frontend-ip-name myFrontend \\\n  --backend-pool-name myBackendPool \\\n  --sku Standard",
          "az network lb probe create \\\n  --resource-group myRG \\\n  --lb-name myLB \\\n  --name myProbe \\\n  --protocol tcp \\\n  --port 80 \\\n  --interval 15 \\\n  --probe-threshold 2",
        ],
      },
      {
        id: "azure-iam",
        title: "Identity and Access Management",
        summary:
          "IAM is the backbone of any secure Azure setup. Between Azure AD, RBAC, managed identities, and service principals, you've got plenty of tools. The trick is using the right one for the right job.",
        details: [
          "Azure AD is Azure's cloud-native identity provider. It handles SSO, MFA, conditional access, and app registration. If you're not using it yet, you will be.",
          "RBAC lets you scope permissions at the subscription, resource group, or resource level. Built-in roles like Owner, Contributor, and Reader cover most cases, but custom roles are there when you need them.",
          "Managed identities are my go-to for anything running in Azure. They eliminate credential storage entirely, giving you an Azure AD-managed principal that's automatically available to VMs, App Service, and AKS pods.",
          "Service principals are the non-interactive identities you use for automation, CI/CD pipelines, and daemons. I've seen too many teams hardcode secrets here instead of using managed identities.",
          "Least-privilege isn't just a buzzword. Custom role definitions and condition-based RBAC let you restrict access down to specific actions and resource attributes. Use it.",
        ],
        commands: [
          "az ad sp create-for-rbac \\\n  --name myServicePrincipal \\\n  --role contributor \\\n  --scopes /subscriptions/<sub-id>/resourceGroups/myRG",
          "az role assignment create \\\n  --assignee <principal-id> \\\n  --role 'Storage Blob Data Contributor' \\\n  --scope /subscriptions/<sub-id>/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mySA",
        ],
      },
      {
        id: "azure-storage",
        title: "Storage",
        summary:
          "Azure Storage covers blobs, files, queues, and tables. It scales well, costs reasonably, and the tiering options actually save you money if you use them properly.",
        details: [
          "Blob Storage gives you block, append, and page blobs with Hot, Cool, Cold, and Archive tiers. The trick is knowing your access patterns so you're not paying Hot prices for data you rarely touch.",
          "Azure Files supports SMB 3.1.1 and NFS 4.1. It mounts from on-prem, Linux, macOS, and Windows, which makes it great for lift-and-shift or shared config storage.",
          "Queue Storage is simple but effective for decoupling producers and consumers. Pair it with Azure Functions and you've got a solid event-driven pipeline.",
          "Table Storage is a NoSQL key-value store. It's fast, schemaless, and great for metadata, logging, and IoT telemetry at massive scale.",
          "Redundancy options (LRS, ZRS, GRS, RA-GRS) protect you at different levels. Pick based on your RPO and RTO requirements, not just what's cheapest.",
        ],
        commands: [
          "az storage account create \\\n  --name mystorageaccount \\\n  --resource-group myRG \\\n  --location eastus \\\n  --sku Standard_LRS \\\n  --kind StorageV2",
          "az storage blob upload \\\n  --account-name mystorageaccount \\\n  --container-name mycontainer \\\n  --name myblob.txt \\\n  --file ./local-file.txt \\\n  --overwrite",
        ],
      },
      {
        id: "azure-databases",
        title: "Databases",
        summary:
          "Managed databases on Azure take a ton of operational burden off your plate. Automated patching, backups, and high availability come built in, so you can focus on queries instead of infrastructure.",
        details: [
          "Azure SQL Database is fully managed with automatic tuning, serverless compute tiers, and up to 99.999% SLA. I've seen teams over-provision here when serverless would save them half the bill.",
          "Azure Database for PostgreSQL Flexible Server gives you zone-redundant storage, in-place major version upgrades, and custom maintenance windows. It's the right choice for most Postgres workloads on Azure.",
          "Cosmos DB is globally distributed, multi-model NoSQL with single-digit millisecond latency at any scale. The five consistency levels let you tune between performance and strictness.",
          "All managed databases handle backups (point-in-time restore up to 35 days), encryption at rest, and network isolation via Private Endpoints. The hard part is choosing the right one for your use case.",
          "Use Azure Data Studio or pgAdmin for local development. Store connection strings in Key Vault and inject them at runtime. Never hardcode them.",
        ],
        commands: [
          "az sql server create \\\n  --name mysqlserver \\\n  --resource-group myRG \\\n  --location eastus \\\n  --admin-user adminUser \\\n  --admin-password <password>",
          "az postgres flexible-server create \\\n  --resource-group myRG \\\n  --name myPGServer \\\n  --admin-user pgadmin \\\n  --admin-password <password> \\\n  --sku-name Standard_D2s_v3 \\\n  --tier GeneralPurpose",
        ],
      },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    topics: [
      {
        id: "terraform-fundamentals",
        title: "Terraform Fundamentals",
        summary:
          "Terraform lets you declare your cloud infrastructure as code using HCL. Once you get the hang of providers, resources, and data sources, you'll never want to click through a console again.",
        details: [
          "HCL is declarative. You describe what you want, and Terraform figures out how to get there. Resource blocks, arguments, expressions, and built-in functions make it surprisingly expressive.",
          "Providers (azurerm, aws, google, kubernetes) authenticate and expose resource types. Pin your versions in a required_providers block, or you'll be debugging mysterious breakages after a weekend.",
          "Resources are the atomic units of infrastructure. Each one maps directly to an API object in the cloud provider's control plane. It's a clean mental model.",
          "Data sources let you read existing resources without managing them. I use them all the time to reference VNet IDs, subnet ranges, or existing resource groups.",
          "Outputs expose computed values after apply. Use them to pass data between modules or just to see connection strings and IPs without digging through state.",
        ],
        commands: [
          "terraform init",
          "terraform plan -out=tfplan",
          "terraform apply tfplan",
        ],
      },
      {
        id: "state-management",
        title: "State Management",
        summary:
          "Terraform state is the glue between your config and your real infrastructure. Store it remotely, lock it, and never, ever commit it to Git.",
        details: [
          "State tracks the mapping between your configuration and real infrastructure. Store it in Azure Blob Storage, AWS S3, or Terraform Cloud. Local state is fine for personal projects, but that's about it.",
          "State locking (Azure Blob lease or DynamoDB) prevents concurrent applies from stomping on each other. I've seen bad things happen without it in team environments.",
          "Workspaces let you isolate state per environment (dev, staging, prod). Each workspace keeps its own state file, so parallel changes don't collide.",
          "terraform import brings existing unmanaged resources into state. After that, you write the corresponding resource block to match. It's tedious but necessary.",
          "Never commit state files to version control. Add them to .gitignore and encrypt at rest via your remote backend's encryption settings.",
        ],
        commands: [
          "terraform state list",
          "terraform state mv aws_instance.old aws_instance.new",
          "terraform import azurerm_storage_account.example /subscriptions/<sub-id>/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mySA",
        ],
      },
      {
        id: "terraform-modules",
        title: "Terraform Modules",
        summary:
          "Modules are how you turn messy Terraform into something reusable and maintainable. Think of them as building blocks that you can version, share, and test independently.",
        details: [
          "Modules encapsulate related resources into composable units. A networking module that creates a VNet, subnets, and NSGs together is a perfect example.",
          "Input variables define the module's contract. Use type constraints, defaults, and validation rules to catch misconfigurations before they hit your infrastructure.",
          "Outputs expose computed values from the module so the calling configuration can reference them without needing to know the internal details. Clean separation.",
          "Publish to a private registry (Terraform Cloud) or call from Git sources with ref parameters for version pinning. I prefer Git refs for most teams.",
          "A clean module structure separates main.tf (resources), variables.tf (inputs), outputs.tf (outputs), versions.tf (provider constraints), and tests/ (validation). It's worth the upfront effort.",
        ],
        commands: [
          "# Module directory structure\nmodules/\n  networking/\n    main.tf\n    variables.tf\n    outputs.tf\n  main.tf (calling module)\n    module \"networking\" {\n      source      = \"./modules/networking\"\n      vnet_cidr   = \"10.0.0.0/16\"\n      environment = \"production\"\n    }",
        ],
      },
      {
        id: "ansible-playbooks",
        title: "Ansible Playbooks",
        summary:
          "Ansible automates configuration management and app deployments across fleets of servers using YAML-driven playbooks and roles. No agent required on the target, which I appreciate more than I expected.",
        details: [
          "Ansible connects over agentless SSH. No daemon, no agent, just Python and SSH access on the managed nodes. That simplicity is its biggest selling point.",
          "Playbooks are YAML files that define plays (host groups), tasks (module calls), handlers (triggered on notify), and variables. They're readable, which matters when someone else has to debug them at 2 AM.",
          "Roles are the organizational backbone: tasks, handlers, templates, files, defaults, vars, and meta in a standard directory layout. Once you internalize this structure, you can navigate any Ansible codebase.",
          "Galaxy gives you community and certified roles. Use ansible-galaxy init to scaffold a new role with the canonical structure. It saves a ton of boilerplate.",
          "Idempotency is Ansible's core promise. Running a playbook twice gives you the same result because modules check current state before making changes. It's one of the things I trust most about it.",
        ],
        commands: [
          "ansible-playbook -i inventory.ini deploy.yml --limit webservers",
          "ansible-galaxy init roles/webserver",
        ],
      },
      {
        id: "config-management",
        title: "Configuration Management",
        summary:
          "Good config management means your servers look the same every time, across every environment. Idempotent tasks, Jinja2 templates, and encrypted secrets make that achievable.",
        details: [
          "Idempotency means each task checks current state before applying changes. Run the same playbook twice and you get zero additional modifications. That's the whole point.",
          "Jinja2 templates render configuration files dynamically using variables, conditionals, and loops. nginx.conf, crontabs, systemd units, all from templates. It's cleaner than hand-editing files.",
          "Ansible Vault encrypts sensitive variables (API keys, passwords) with AES-256. Encrypted files are safe to commit to version control, which makes secret management way less painful.",
          "Dynamic inventory scripts query cloud APIs (Azure, AWS) at runtime, auto-discovering VMs by tags, regions, or resource groups. No more maintaining static host files.",
          "Use ansible-inventory --list to verify dynamic inventory output before running playbooks. I've wasted too much time debugging playbooks that were targeting the wrong hosts.",
        ],
        commands: [
          "ansible-vault encrypt vars/secrets.yml",
          "ansible-vault edit vars/secrets.yml",
          "ansible-inventory --list -i azure_rm.yml",
        ],
      },
    ],
  },
  {
    id: "containers",
    label: "Containers",
    topics: [
      {
        id: "docker-images",
        title: "Docker Images",
        summary:
          "Building good Docker images is part art, part discipline. Multi-stage builds, smart layer ordering, and minimal base images keep your images small, fast, and secure.",
        details: [
          "Multi-stage builds let you compile in a full SDK image and copy only the artifacts to a slim runtime image. The size difference is dramatic, and smaller images mean faster deploys and smaller attack surfaces.",
          "Layer ordering matters more than most people realize. Put rarely-changing layers (dependency install) above frequently-changing ones (source code) to maximize cache hits. Your CI will thank you.",
          ".dockerignore excludes node_modules, .git, tests, and build artifacts from the build context. It speeds up builds and prevents image bloat. I treat it as mandatory, not optional.",
          "Base image selection impacts security and size. Distroless or Alpine images minimize CVE exposure compared to full Ubuntu or Debian. For most Node.js apps, Alpine is the right call.",
          "Use docker scout or trivy to scan images for known vulnerabilities before pushing. Automate it in CI so nobody can accidentally push a vulnerable image to production.",
        ],
        commands: [
          "docker build -t myapp:latest .",
          "# Multi-stage Dockerfile example\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCMD [\"node\", \"dist/main.js\"]",
        ],
      },
      {
        id: "docker-networking",
        title: "Docker Networking",
        summary:
          "Docker networking is how containers talk to each other and the outside world. Bridge, host, and overlay each have their place, and knowing when to use which one saves a lot of headaches.",
        details: [
          "The bridge network (default) creates an isolated network on the Docker host. Containers communicate via IP and can be reached via published ports. It's the right choice for most single-host setups.",
          "Host networking removes the network namespace entirely. The container shares the host's IP and ports directly. It's great for performance-critical workloads, but you lose port isolation.",
          "Overlay networks span multiple Docker Swarm nodes or work with Kubernetes for cross-node pod communication. If you're doing multi-host containers, this is what you need.",
          "Container DNS resolution lets containers reach each other by name within the same user-defined bridge network. No IPs required. It's one of the first things I set up when spinning up a dev stack.",
          "Port mapping (-p host:container) exposes container services externally. Bind to 127.0.0.1 if you only want host access. I've seen too many containers exposed to the internet by default.",
        ],
        commands: [
          "docker network create --driver bridge my-network",
          "docker run -d --name api --network my-network -p 8080:80 myapp:latest",
          "docker network inspect my-network",
        ],
      },
      {
        id: "kubernetes-pods",
        title: "Kubernetes Pods",
        summary:
          "Pods are the smallest deployable unit in Kubernetes. They're ephemeral by design, so don't get attached to them. Use init containers, set resource limits, and always configure health probes.",
        details: [
          "A Pod wraps one or more containers that share a network namespace, volumes, and lifecycle. Co-located containers in a Pod always get scheduled together. It's a useful abstraction for sidecar patterns.",
          "Init containers run sequentially before the main container starts. I use them for database migrations, config generation, or waiting on dependencies. They're simple but powerful.",
          "Resource requests guarantee minimum CPU and memory. Limits enforce maximums. Without them, a single noisy Pod can starve its node. Always set both.",
          "Liveness probes tell Kubernetes if a container is alive. A failed probe triggers a restart. Readiness probes control traffic routing, removing unhealthy Pods from Service endpoints. Both matter.",
          "Pods are ephemeral. Never assign persistent identity or IP directly to one. Use Services and StatefulSets for stable network identity. That's the Kubernetes way.",
        ],
        commands: [
          "# Pod YAML example\napiVersion: v1\nkind: Pod\nmetadata:\n  name: api-pod\n  labels:\n    app: api\nspec:\n  initContainers:\n    - name: wait-for-db\n      image: busybox:1.36\n      command: ['sh', '-c', 'until nc -z postgres 5432; do sleep 2; done']\n  containers:\n    - name: api\n      image: myapp:1.0.0\n      ports:\n        - containerPort: 8080\n      resources:\n        requests:\n          memory: \"256Mi\"\n          cpu: \"250m\"\n        limits:\n          memory: \"512Mi\"\n          cpu: \"500m\"\n      livenessProbe:\n        httpGet:\n          path: /healthz\n          port: 8080\n        initialDelaySeconds: 10\n        periodSeconds: 15\n      readinessProbe:\n        httpGet:\n          path: /ready\n          port: 8080\n        initialDelaySeconds: 5\n        periodSeconds: 10",
        ],
      },
      {
        id: "deployments-services",
        title: "Deployments and Services",
        summary:
          "Deployments handle rolling updates and rollbacks. Services handle discovery and exposure. Together they're the core of how you actually ship code to a Kubernetes cluster.",
        details: [
          "Deployments declaratively manage ReplicaSets. Update the pod template spec and Kubernetes does a rolling update, replacing pods incrementally. It's elegant when it works.",
          "Rollbacks are first-class in Kubernetes. kubectl rollout undo reverts to the previous revision instantly because old ReplicaSets are retained. I've used this more than I'd like to admit.",
          "Service types define how things get exposed: ClusterIP (internal), NodePort (fixed port on every node), LoadBalancer (cloud-provisioned LB), or ExternalName (CNAME alias). Pick based on what you're actually exposing.",
          "maxSurge and maxUnavailable control how aggressively new pods replace old ones during rollouts. I usually start conservative and loosen up once I trust the deployment.",
          "Use kubectl rollout history and kubectl rollout status to monitor what's happening in real time. Guessing during a rollout is a recipe for a bad day.",
        ],
        commands: [
          "kubectl rollout status deployment/api-deployment",
          "kubectl rollout undo deployment/api-deployment --to-revision=3",
          "kubectl rollout history deployment/api-deployment",
        ],
      },
      {
        id: "ingress-helm",
        title: "Ingress and Helm",
        summary:
          "Ingress routes external HTTP/S traffic into your cluster. Helm packages your Kubernetes manifests into deployable charts. Both are essential if you're running anything beyond a toy cluster.",
        details: [
          "An Ingress resource defines routing rules (host, path, backend service) that an Ingress controller (NGINX, Traefik, Azure Application Gateway) processes. It's the standard way to get traffic in.",
          "TLS termination at the Ingress level encrypts external traffic and offloads certificate management from backend services. Use Kubernetes TLS Secrets and you've got a clean setup.",
          "Helm packages Kubernetes manifests into charts with configurable values. Version your infrastructure, share charts across teams, and deploy with helm install. It's the package manager Kubernetes never had.",
          "values.yaml overrides let you customize per-environment (replica count, image tag, resource limits) without touching chart templates. It's how you keep one chart working across dev, staging, and prod.",
          "Helm hooks (pre-install, pre-upgrade, post-delete) enable migration scripts, cert-manager certificate issuance, and cleanup jobs. They're underrated and worth learning.",
        ],
        commands: [
          "helm install my-release ./charts/my-app \\\n  --namespace production \\\n  --set image.tag=1.2.3 \\\n  --values values-prod.yaml",
          "helm upgrade my-release ./charts/my-app \\\n  --namespace production \\\n  --reuse-values \\\n  --set replicaCount=3",
          "kubectl get ingress -n production",
        ],
      },
    ],
  },
  {
    id: "cicd",
    label: "CI/CD",
    topics: [
      {
        id: "gh-actions-workflows",
        title: "GitHub Actions Workflows",
        summary:
          "GitHub Actions makes CI/CD approachable with YAML-driven workflows triggered by pushes, PRs, schedules, and custom events. Once you set up a good workflow, it runs itself.",
        details: [
          "Workflows live in .github/workflows/ and define jobs that run on runners (ubuntu-latest, self-hosted, Windows/macOS). It's straightforward once you get the mental model.",
          "Triggers (on:) control when workflows run: push, pull_request, schedule (cron), workflow_dispatch (manual), or workflow_call (reusable). Mix and match based on your release process.",
          "Matrix builds let you test across multiple OS, language versions, or configurations in parallel with a single job definition. It's one of my favorite features for catching cross-platform issues.",
          "Steps can use pre-built actions from the Marketplace (actions/checkout, actions/setup-node) or run inline shell commands. The ecosystem is mature enough that you rarely need to build from scratch.",
          "Concurrency groups prevent duplicate runs on rapid pushes. Cancel in-progress runs when a newer commit arrives. It saves runner minutes and avoids confusing output.",
        ],
        commands: [
          "# .github/workflows/ci.yml\nname: CI\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  build-and-test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        node-version: [18, 20]\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: ${{ matrix.node-version }}\n          cache: 'npm'\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test",
        ],
      },
      {
        id: "build-pipelines",
        title: "Build Pipelines",
        summary:
          "Faster pipelines mean faster feedback. Dependency caching, artifact sharing, and parallel jobs are the low-hanging fruit that cut your CI time significantly.",
        details: [
          "actions/cache caches npm, pip, or Gradle dependencies keyed by lockfile hash. Subsequent runs skip the full download. It's the single biggest time saver for most projects.",
          "Artifacts (actions/upload-artifact) persist build outputs (dist/, coverage/, Docker images) across jobs. Download them in deploy jobs or for debugging failed builds.",
          "Parallel jobs run independent stages (lint, test, build) simultaneously. Total pipeline wall-clock time drops fast once you stop running everything sequentially.",
          "Use restore-keys fallback in cache actions to get partial cache hits when lockfiles change between runs. It's not a perfect cache, but it's better than nothing.",
          "Composite actions bundle multi-step sequences into reusable components across repositories. If you find yourself copy-pasting workflow steps, extract them.",
        ],
        commands: [
          "- uses: actions/cache@v4\n  with:\n    path: ~/.npm\n    key: npm-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}\n    restore-keys: |\n      npm-${{ runner.os }}-",
          "- uses: actions/upload-artifact@v4\n  with:\n    name: build-output\n    path: dist/\n    retention-days: 7",
        ],
      },
      {
        id: "testing-automation",
        title: "Testing Automation",
        summary:
          "Automated testing in CI catches regressions before they reach production. The key is running the right tests at the right speed, not just maximizing coverage numbers.",
        details: [
          "Unit tests run in seconds and catch regressions early. Jest, Vitest, or PyTest on every push enforces quality gates. It's table stakes at this point.",
          "Integration tests validate API contracts, database queries, and service interactions. Run them in isolated containers with test databases. Don't let them flake in shared environments.",
          "Coverage reporting (jest --coverage, c8) tracks which lines and branches are tested. Enforce minimum thresholds, but don't obsess over 100%. It's a guide, not a goal.",
          "Test parallelization (jest --maxWorkers, vitest pool) splits suites across workers. Feedback time drops from minutes to seconds. It's worth the setup.",
          "Fail fast in CI: run the fastest checks (lint, typecheck) before tests. Catch trivial errors before expensive test suites waste compute. It's a small optimization that adds up.",
        ],
        commands: [
          "npm run test:ci -- --coverage --reporters=default --reporters=jest-junit",
          "npx vitest run --reporter=verbose --pool=forks",
          "npx c8 report --reporter=lcov --reporter=text-summary",
        ],
      },
      {
        id: "deployment-strategies",
        title: "Deployment Strategies",
        summary:
          "How you deploy matters as much as what you deploy. Blue-green, canary, rolling, and feature flag strategies each have tradeoffs in downtime, risk, and rollback speed.",
        details: [
          "Blue-green deployment maintains two identical environments. Traffic switches atomically from blue (current) to green (new), enabling instant rollback. It's simple but costs double the infrastructure.",
          "Canary deployment gradually routes a small percentage of traffic to the new version. Monitor metrics before progressively rolling out to 100%. I prefer this for anything with real user impact.",
          "Rolling updates replace pods incrementally using maxSurge and maxUnavailable. It's Kubernetes' default strategy and cost-effective, but rollback is slower than blue-green.",
          "Feature flags decouple deployment from release. Deploy code to production behind a flag and toggle visibility for specific users or segments. It's how modern teams ship without the drama.",
          "Automate rollback triggers: if error rate, latency, or CPU exceeds thresholds during canary, automatically route traffic back to the stable version. Manual rollback during an incident is stressful and slow.",
        ],
        commands: [
          "# Kubernetes rolling update\nkubectl set image deployment/api api=myapp:2.0.0 --record\n\n# Rollback if needed\nkubectl rollout undo deployment/api\n\n# Check revision history\nkubectl rollout history deployment/api",
        ],
      },
      {
        id: "environment-management",
        title: "Environment Management",
        summary:
          "Isolating deployments and managing secrets properly prevents the classic 'works in staging, breaks in prod' scenario. GitHub Environments and protection rules make this manageable.",
        details: [
          "GitHub Environments (dev, staging, production) isolate deployment targets with per-environment secrets, variables, and protection rules. It's cleaner than managing everything in one place.",
          "Protection rules require manual approval or specific reviewers before a workflow deploys to production. That human safety gate has saved me more than once.",
          "Secrets are encrypted and masked in logs. Use environment-level secrets to restrict access. Production keys should only be available to production jobs. Period.",
          "Deployment branches restrict which branches (e.g., main only) can deploy to an environment. It prevents accidental staging-to-prod promotions, which are way too common.",
          "Use GitHub CLI (gh) to manage environments and secrets programmatically in setup scripts or infrastructure-as-code workflows. Manual UI clicking doesn't scale.",
        ],
        commands: [
          "gh api repos/{owner}/{repo}/environments/prod --method PUT",
          "gh secret set AZURE_CREDENTIALS -e production -b \"$(az ad sp create-for-rbac --sdk-auth)\"",
          "gh secret set DATABASE_URL -e staging -b \"postgres://...\"",
        ],
      },
    ],
  },
];
